import React from 'react'
import { format, addDays, subDays } from 'date-fns'

const BASE_URL = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter'

export function useTidalFlow(stationId) {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    function buildUrl(stationId) {
        const begin = format(subDays(new Date(), 1), 'yyyyMMdd')
        const end = format(addDays(new Date(), 7), 'yyyyMMdd')

        return `${BASE_URL}?station=${stationId}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=6&units=english&application=web_services&format=json&begin_date=${begin}&end_date=${end}`
    }

    const load = React.useCallback(async () => {
        try {
            if (!stationId) return

            setLoading(true)
            setError(null)

            const res = await fetch(buildUrl(stationId))
            const json = await res.json()

            if (json.error) throw new Error(json.error.message)

            const now = Date.now()
            const predictions = (json.predictions ?? []).map(p => {
                const x = new Date(p.t).getTime()
                return {
                    x,
                    height: parseFloat(p.v),
                    isForecast: x > now,
                }
            })

            setData(predictions)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [stationId])

    React.useEffect(() => { load() }, [load])

    return { data, loading, error, refresh: load }
}