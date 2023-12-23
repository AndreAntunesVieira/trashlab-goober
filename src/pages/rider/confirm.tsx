import Map from "@/components/map/map.component";
import DefaultPage from "@/layouts/default-page";
import RiderConfirmSection from "@/components/sections/rider-confirm-section/rider-confirm-section.component";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getDistance, humanizeRide} from "@/components/map/location-utils";
import {api} from "@/utils/api";
import {type Driver} from "@/components/user/user.types";
import {addDriverPrices, getAuthenticatedUser} from "@/components/user/user-utils";
import BackButton from "@/components/common/back-button";


export default function RiderConfirmPage() {
  const router = useRouter()
  const availableDrivers = api.rider.availableDrivers.useQuery();
  const startRideDrivers = api.rider.startRide.useMutation();
  const params = typeof (window) ? new URLSearchParams(global.location?.search) : {get: (_: string) => ''}
  const pickup = params.get('pickup') ?? ''
  const dropoff = params.get('dropoff') ?? ''
  const [route, setRoute] = useState({distance: 0, duration: 0})

  const {distance, duration} = humanizeRide(route ?? {distance: 0, duration: 0})
  const availableDriversCount = availableDrivers.data?.length ?? 0
  const dynamicMultiplier = availableDriversCount > 1 ? 1 : 2
  const drivers: Driver[] = addDriverPrices(dynamicMultiplier, distance, availableDrivers?.data)


  const handleOnSubmit = (driver: Driver) => {
    const rider = getAuthenticatedUser()
    const driverId = driver.id ?? ''
    startRideDrivers.mutate({
      price: driver.price,
      dynamicMultiplier,
      distance: route.distance, duration: route.duration, pickup, dropoff, driverId, riderId: String(rider.id)
    })
  }

  useEffect(() => {
    if (startRideDrivers.data) {
      void router.push(`/rider/${startRideDrivers.data.id}`)
    }
  }, [startRideDrivers.data])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (!params.has('pickup') || !params.has('dropoff')) {
      void router.push("/rider/search")
    } else {
      void getDistance(pickup, dropoff).then(({routes, ...x}) => {
        setRoute(routes[0])
      })
    }

  }, []);
  return (
    <DefaultPage title="Confirm ride">
      <Map pickupCoords={pickup} dropoffCoords={dropoff}/>
      <BackButton href="/rider/search" float />
      <RiderConfirmSection onSubmit={handleOnSubmit}
                           distance={distance}
                           duration={duration}
                           dynamicMultiplier={dynamicMultiplier}
                           drivers={drivers}/>
    </DefaultPage>
  );
}
