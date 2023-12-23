import mapboxgl from "mapbox-gl";


export async function searchLocation(search: string, limit = 10) {
  return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${mapboxgl.accessToken}&limit=${limit}`)
    .then(r => r.json())
}

export async function getDistance(pickupCoords: string | string[], dropoffCoords: string | string[]) {
  const pickupCoordsStr = typeof (pickupCoords) == 'string' ? pickupCoords : pickupCoords.join(',')
  const dropoffCoordsStr = typeof (dropoffCoords) == 'string' ? dropoffCoords : dropoffCoords.join(',')
  return fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordsStr};${dropoffCoordsStr}?access_token=${mapboxgl.accessToken}`)
    .then(r => r.json())
}

export const isValidCoords = (coords: [number, number] | string) => coords && coords.toString() !== '0,0'

export interface HumanizedRide {
  distance: number
  duration: number
  pickup?: string
  dropoff?: string

  [key: string]: any
}

export const humanizeRide = (data: (HumanizedRide | null)) => {
  if (!data) return {distance: 0, duration: 0} as HumanizedRide
  return ({
    ...data,
    status: data.status,
    distance: data?.distance / 1000,
    duration: data?.duration / 60,
  })
}
