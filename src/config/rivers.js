import { FISH } from './fish'
import { RIVER_TYPES } from './riverTypes'
import { STATIONS } from './stations'

export const RIVERS = [
  {
    id: 'yakima',
    name: 'Yakima River',
    state: 'WA',
    lat: 46.8581,
    lng: -120.5059,
    image: null,
    subImage: null,
    description: 'A premier catch-and-release trout fishery running through the Yakima Canyon.',
    type: [RIVER_TYPES.tailwater, RIVER_TYPES.freestone],
    fish: [FISH.rainbow_trout, FISH.brown_trout],
    stations: [STATIONS.EASW1, STATIONS.UMTW1, STATIONS.PARW1],
  },
]