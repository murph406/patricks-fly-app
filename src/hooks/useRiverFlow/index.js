import React from 'react'

const BASE_URL = 'https://api.water.noaa.gov/nwps/v1/gauges'

export function useRiverFlow(stationId) {
    const [observed, setObserved] = React.useState(null)
    const [forecast, setForecast] = React.useState(null)
    const [data, setData] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    const load = React.useCallback(async () => {
        if (!stationId) return
        setLoading(true)
        setError(null)

        try {
            const [obs, fcast] = await Promise.allSettled([
                fetch(`${BASE_URL}/${stationId}/stageflow/observed`).then(r => r.json()),
                fetch(`${BASE_URL}/${stationId}/stageflow/forecast`).then(r => r.json()),
            ])

            const threshHold = Date.now() - (7 * 24 * 60 * 60 * 1000)
            const observedPoints = obs.status === 'fulfilled'
                ? (obs.value?.data ?? [])
                    .filter(p => new Date(p.validTime).getTime() >= threshHold)
                    .map(p => ({ ...p, isForecast: false }))
                : []

            const forecastPoints = fcast.status === 'fulfilled'
                ? (fcast.value?.data ?? []).map(p => ({ ...p, isForecast: true }))
                : []

            setForecast(fcast.value)
            setObserved(obs.value)
            setData([...observedPoints, ...forecastPoints])
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [stationId])

    React.useEffect(() => { load() }, [load])

    return { data, observed, forecast, loading, error, refresh: load }
}