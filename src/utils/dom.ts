export function serializeForm(formElement: HTMLFormElement) {
  const formDataObj: any = {};
  new FormData(formElement).forEach((value, key) => (formDataObj[key] = value));
  return formDataObj
}


interface NavigatorLocation {
  coords: {
    longitude: number
    latitude: number
  }
}
export function getNavigatorLocation() {
  return new Promise((promiseResolve) => {
    const options = { enableHighAccuracy: true, timeout: 5000 }
    const success = (pos: NavigatorLocation) => promiseResolve({lng: pos.coords.longitude, lat: pos.coords.latitude})
    const error = () => promiseResolve({lng: -122.45, lat: 37.70})

    navigator.geolocation.getCurrentPosition(success, error, options);
  })
}
