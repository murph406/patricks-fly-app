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
    image: require('@assets/images/yakima-detail.png'),
    subImage: require('@assets/images/yakima-background.png'),
    description: 'A premier catch-and-release trout fishery running through the Yakima Canyon.',
    type: [RIVER_TYPES.tailwater, RIVER_TYPES.freestone],
    fish: [FISH.rainbow_trout, FISH.brown_trout],
    stations: [STATIONS.EASW1, STATIONS.YUMW1, STATIONS.TNAW1, STATIONS.HLKW1, STATIONS.UMTW1],
  },
]