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
    description: 'The Yakima cuts through a steep basalt canyon in central Washington, fed by the eastern slopes of the Cascades.',
    type: [RIVER_TYPES.tailwater, RIVER_TYPES.freestone],
    fish: [FISH.rainbow_trout, FISH.brown_trout],
    stations: [STATIONS.EASW1, STATIONS.YUMW1, STATIONS.TNAW1, STATIONS.HLKW1, STATIONS.UMTW1],
  },
  {
    id: 'skagit',
    name: 'Skagit River Basin',
    state: 'WA',
    lat: 48.4450,
    lng: -122.334,
    image: require('@assets/images/skagit-detail.png'),
    subImage: require('@assets/images/skagit-background.png'),
    description: 'A major river draining the North Cascades of northwest Washington, running from the high peaks through old growth valleys to Puget Sound.',
    type: [],
    fish: [],
    stations: [STATIONS.CONW1, STATIONS.MVEW1, STATIONS.SRMW1, STATIONS.GORW1],
  },
]