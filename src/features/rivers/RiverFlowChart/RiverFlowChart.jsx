import React from 'react'

import { View, StyleSheet, ActivityIndicator } from 'react-native'

import { Text as SkiaText, Line as SkiaLine, useFont, Circle as SkiaCircle, vec } from '@shopify/react-native-skia'
import { format } from 'date-fns'
import { useDerivedValue, useSharedValue } from 'react-native-reanimated'
import { CartesianChart, Line, Area, useChartPressState, } from 'victory-native'

import EmptyState from '@components/composites/EmptyState'
import useStyles from '@hooks/useStyles'

const APPROX_LABEL_WIDTH = 70
const APPROX_LABEL_HEIGHT = 20

const RiverFlowChart = (props) => {
  const { data, loading, error } = props
  const s = useStyles(createStyles)
  const { state, isActive } = useChartPressState({ x: 0, y: { flow: 0 } })
  const fontLg = useFont(require('@assets/fonts/lato/bold-extra.ttf'), 14)
  const fontLabel = useFont(require('@assets/fonts/lato/bold.ttf'), 12)

  const chartData = React.useMemo(() => {
    if (!data) return []
    return data.map(point => ({
      x: new Date(point.validTime).getTime(),
      flow: point.secondary ?? 0,
      stage: point.primary ?? 0,
      isForecast: point.isForecast,
    }))
  }, [data])

  const observedData = React.useMemo(() => chartData.filter(p => !p.isForecast), [chartData])

  const todayX = useSharedValue(0)
  const chartTop = useSharedValue(0)
  const chartBottom = useSharedValue(0)
  const chartLeft = useSharedValue(0)
  const chartRight = useSharedValue(0)
  const activeFlow = useDerivedValue(() => `${Math.round(state.y.flow.value.value * 1000).toLocaleString()} CFS`)
  const todayLabelX = useDerivedValue(() => todayX.value - 17)
  const todayLabelY = useDerivedValue(() => chartTop.value + 10)
  const p1Today = useDerivedValue(() => vec(todayX.value, chartTop.value + 22))
  const p2Today = useDerivedValue(() => vec(todayX.value, chartBottom.value))
  const p1Current = useDerivedValue(() => vec(state.x.position.value, chartTop.value))
  const p2Current = useDerivedValue(() => vec(state.x.position.value, chartBottom.value))
  const labelX = useDerivedValue(() => {
    const x = state.x.position.value - APPROX_LABEL_WIDTH / 2
    const minX = chartLeft.value + 4
    const maxX = chartRight.value - APPROX_LABEL_WIDTH
    return Math.max(minX, Math.min(x, maxX))
  })
  const labelY = useDerivedValue(() => {
    const y = state.y.flow.position.value - 12
    const minY = chartTop.value + APPROX_LABEL_HEIGHT
    const maxY = chartBottom.value - 4
    return Math.max(minY, Math.min(y, maxY))
  })

  return (
    <React.Fragment>
      {!loading && (!error || chartData.length !== 0) && (
        <View style={s.container}>
          <CartesianChart
            xKey="x"
            yKeys={["flow"]}
            data={chartData}
            chartPressState={state}
            axisOptions={{
              font: fontLabel,
              tickCount: { x: 6, y: 6 },
              labelColor: s.text,
              lineColor: s.surface4,
              labelOffset: { x: 6, y: 6 },
              formatXLabel: (ms) => format(new Date(ms), 'MM/dd'),
              formatYLabel: (val) => `${(val * 1000).toFixed(0)}`,
            }}>

            {({ points, chartBounds }) => {
              chartTop.value = chartBounds.top
              chartBottom.value = chartBounds.bottom
              chartLeft.value = chartBounds.left
              chartRight.value = chartBounds.right

              const cutoff = observedData.length
              const observedPoints = points.flow.slice(0, cutoff)
              const forecastPoints = points.flow.slice(cutoff)
              const todayPoint = points.flow[cutoff]
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
                        style="stroke"
                      />

                      <SkiaCircle
                        r={6}
                        cx={state.x.position}
                        cy={state.y.flow.position}
                        color={s.blueSurface3}
                      />

                      <SkiaText
                        text={activeFlow}
                        font={fontLg}
                        color={s.text}
                        x={labelX}
                        y={labelY}
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

      {!loading && (error || chartData.length == 0) && (
        <View style={s.centered}>
          <EmptyState text='No flow data available' />
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
      paddingLeft: vars.unit
    },
    centered: {
      height: vars.unit * 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tooltip: {
      textAlign: 'center',
      marginBottom: vars.half,
    },
    surface1: hslToHex(colors.surface3),
    surface3: hslToHex(colors.surface5),
    blueSurface1: hslToHex(colors.blueSurface1),
    blueSurface3: hslToHex(colors.blueSurface3),
    text: hslToHex(colors.text),
    text2: hslToHex(colors.text2),
    text3: hslToHex(colors.text3),
    surface4: hslToHex(colors.surface4),
  })
}

export default RiverFlowChart
