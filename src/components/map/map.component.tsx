// @ts-nocheck
import mapboxgl from "mapbox-gl";
import {env} from "@/env";
import {useEffect} from "react";
import classNames from "classnames";
import styles from "./map.module.css";
import {isValidCoords} from "@/components/map/location-utils";
import {getNavigatorLocation} from "@/utils/dom";

mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN;

interface MapComponentProps {
  showUserPointer?: boolean
  pickupCoords?: [number, number] | string
  dropoffCoords?: [number, number] | string
}


const defineMap = (container: string, lng: number, lat: number, showUserPointer = false) => {
  global.map = {
    element: new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: 12,
    }),
    user: {element: null, coords: [lng, lat]},
    pickup: {element: null, coords: null},
    dropoff: {element: null, coords: null}
  }
  if(showUserPointer){
    global.map.user.element = new mapboxgl.Marker({color: '#00abd1'}).setLngLat([lng, lat]).addTo(global.map.element)
  }
}


export default function MapComponent({showUserPointer = false, pickupCoords, dropoffCoords}: MapComponentProps) {
  const updateCoords = (type: string, center: string | string[], color = '#011178') => {
    if(!isValidCoords(center)) return undefined
    if (typeof center == 'string') center = center.split(',')
    global.map[type].coords = center
    if (!global.map[type].element) global.map[type].element = new mapboxgl.Marker({color}).setLngLat(global.map[type].coords).addTo(global.map.element)
    else global.map[type].element.setLngLat(center);

    if(global.map.pickup.coords && global.map.dropoff.coords){
      global.map.element.fitBounds([global.map.pickup.coords, global.map.dropoff.coords], {padding: 40})
    }
  }

  useEffect(() => {
    void getNavigatorLocation().then((coords) => {
      document.querySelector("#map").innerHTML = ''
      defineMap('map', coords.lng, coords.lat, showUserPointer)

      if (pickupCoords && dropoffCoords) {
        updateCoords('pickup', pickupCoords)
        updateCoords('dropoff', dropoffCoords, '#00abd1')
      }
    })
  }, []);

  useEffect(() => {
    if (global.map?.element && pickupCoords) updateCoords('pickup', pickupCoords)
    if (global.map?.element && dropoffCoords) updateCoords('dropoff', dropoffCoords, '#00abd1')
  }, [global.map?.element, pickupCoords, dropoffCoords]);
  return <div id="map" className={classNames("grow w-full", styles.map)}/>
}
