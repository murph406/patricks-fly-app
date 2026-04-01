import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { useDerivedValue, useSharedValue } from 'react-native-reanimated'

import { format } from 'date-fns'
import { CartesianChart, Line, Area, useChartPressState } from 'victory-native'
import { Text as SkiaText, Line as SkiaLine, useFont, Circle as SkiaCircle, vec } from '@shopify/react-native-skia'

import useStyles from '@hooks/useStyles'
import EmptyState from '@components/composites/EmptyState'

const APPROX_LABEL_WIDTH = 50
const APPROX_TIME_LABEL_WIDTH = 85
const APPROX_LABEL_HEIGHT = 20

const TidalFlowChart = (props) => {
  const { data, loading, error } = props
  const s = useStyles(createStyles)
  const { state, isActive } = useChartPressState({ x: 0, y: { height: 0 } })
  const fontLg = useFont(require('@assets/fonts/lato/bold-extra.ttf'), 16)
  const fontMd = useFont(require('@assets/fonts/lato/bold-extra.ttf'), 14)
  const fontLabel = useFont(require('@assets/fonts/lato/bold.ttf'), 12)

  const chartData = React.useMemo(() => {
    if (!data?.length) return []
    return data.map(point => ({
      x: point.x,
      height: point.height,
      isForecast: point.isForecast,
    }))
  }, [data])

  const observedData = React.useMemo(() => chartData.filter(p => !p.isForecast), [chartData])

  const todayX = useSharedValue(0)
  const chartTop = useSharedValue(0)
  const chartBottom = useSharedValue(0)
  const chartLeft = useSharedValue(0)
  const chartRight = useSharedValue(0)

  const activeHeight = useDerivedValue(() => `${state.y.height.value.value.toFixed(2)} ft`)

  const todayLabelX = useDerivedValue(() => todayX.value - 17)
  const todayLabelY = useDerivedValue(() => chartTop.value + 10)
  const p1Today = useDerivedValue(() => vec(todayX.value, chartTop.value + 22))
  const p2Today = useDerivedValue(() => vec(todayX.value, chartBottom.value))
  const p1Current = useDerivedValue(() => vec(state.x.position.value, chartTop.value))
  const p2Current = useDerivedValue(() => vec(state.x.position.value, chartBottom.value))
  const activeTime = useDerivedValue(() => {
    const ms = state.x.value.value
    const date = new Date(ms)
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const amPm = hours >= 12 ? 'PM' : 'AM'
    const h = hours % 12 || 12
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}/${day} ${h}:${minutes} ${amPm}`
  })
  const labelX = useDerivedValue(() => {
    const x = state.x.position.value - APPROX_LABEL_WIDTH / 2
    const minX = chartLeft.value + 4
    const maxX = chartRight.value - APPROX_LABEL_WIDTH
    return Math.max(minX, Math.min(x, maxX))
  })
  const timeLabelX = useDerivedValue(() => {
    const x = state.x.position.value - APPROX_TIME_LABEL_WIDTH / 2
    const minX = chartLeft.value + 4
    const maxX = chartRight.value - APPROX_TIME_LABEL_WIDTH
    return Math.max(minX, Math.min(x, maxX))
  })
  const labelY = useDerivedValue(() => {
    const y = state.y.height.position.value - 12
    const minY = chartTop.value + APPROX_LABEL_HEIGHT
    const maxY = chartBottom.value - 4
    return Math.max(minY, Math.min(y, maxY))
  })
  const timeLabelY = useDerivedValue(() => {
    const y = state.y.height.position.value - 12
    const minY = chartTop.value + APPROX_LABEL_HEIGHT
    const maxY = chartBottom.value - 4
    const clampedY = Math.max(minY, Math.min(y, maxY))
    return clampedY + 18
  })

  return (
    <React.Fragment>
      {!loading && (!error || chartData.length !== 0) && (
        <View style={s.container}>
          <CartesianChart
            xKey="x"
            yKeys={["height"]}
            data={chartData}
            chartPressState={state}
            axisOptions={{
              font: fontLabel,
              tickCount: { x: 6, y: 4 },
              labelColor: s.text,
              lineColor: s.surface4,
              labelOffset: { x: 6, y: 6 },
              formatXLabel: (ms) => format(new Date(ms), 'MM/dd'),
              formatYLabel: (val) => `${val.toFixed(1)}ft`,
            }}>

            {({ points, chartBounds }) => {
              chartTop.value = chartBounds.top
              chartBottom.value = chartBounds.bottom
              chartLeft.value = chartBounds.left
              chartRight.value = chartBounds.right

              const cutoff = observedData.length
              const observedPoints = points.height.slice(0, cutoff)
              const forecastPoints = points.height.slice(cutoff)
              const todayPoint = points.height[cutoff]
              if (todayPoint?.x != null) todayX.value = todayPoint.x

              return (
                <React.Fragment>
                  <Area
                    points={observedPoints}
                    y0={chartBounds.bottom}
                    color={s.surface1}
                    animate={{ type: 'timing', duration: 400 }}
                  />
                  <Line
                    points={observedPoints}
                    color={s.surface3}
                    strokeWidth={2}
                    animate={{ type: 'timing', duration: 400 }}
                  />

                  <Area
                    points={forecastPoints}
                    y0={chartBounds.bottom}
                    color={s.blueSurface1}
                    animate={{ type: 'timing', duration: 400 }}
                  />
                  <Line
                    points={forecastPoints}
                    color={s.blueSurface3}
                    strokeWidth={2}
                    strokeDashArray={[4, 4]}
                    animate={{ type: 'timing', duration: 400 }}
                  />

                  <SkiaLine
                    p1={p1Today}
                    p2={p2Today}
                    color={s.text3}
                    strokeWidth={1}
                  />
                  <SkiaText
                    text='Today'
                    font={fontLabel}
                    color={s.text}
                    x={todayLabelX}
                    y={todayLabelY}
                  />

                  {isActive && (
                    <React.Fragment>
                      <SkiaLine
                        p1={p1Current}
                        p2={p2Current}
                        color={s.blueSurface3}
                        strokeWidth={1}
                      />
                      <SkiaCircle
                        r={6}
                        cx={state.x.position}
                        cy={state.y.height.position}
                        color={s.blueSurface3}
                      />
                      <SkiaText
                        text={activeHeight}
                        font={fontLg}
                        color={s.text}
                        x={labelX}
                        y={labelY}
                      />
                      <SkiaText
                        text={activeTime}
                        font={fontMd}
                        color={s.text}
                        x={timeLabelX}
                        y={timeLabelY}
                      />
                    </React.Fragment>
                  )}
                </React.Fragment>
              )
            }}
          </CartesianChart>
        </View>
      )}

      {loading && (!error || chartData.length !== 0) && (
        <View style={s.centered}>
          <ActivityIndicator />
        </View>
      )}

      {!loading && (error || chartData.length === 0) && (
        <View style={s.centered}>
          <EmptyState text='No tide data available' />
        </View>
      )}
    </React.Fragment>
  )
}

const createStyles = (theme) => {
  const { vars, colors, hslToHex } = theme

  return StyleSheet.create({
    container: {
      height: vars.unit * 25,
      width: '100%',
    },
    centered: {
      height: vars.unit * 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    surface1: hslToHex(colors.surface3),
    surface3: hslToHex(colors.surface5),
    blueSurface1: hslToHex(colors.blueSurface1),
    blueSurface3: hslToHex(colors.blueSurface3),
    text: hslToHex(colors.text),
    text3: hslToHex(colors.text3),
    surface4: hslToHex(colors.surface4),
  })
}

export default TidalFlowChart