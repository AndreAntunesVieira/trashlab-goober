import Map from "@/components/map/map.component";
import RiderRidingSection from "@/components/sections/rider-riding-section/rider-riding-section.component";
import DefaultPage from "@/layouts/default-page";
import {api} from "@/utils/api";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {type HumanizedRide, humanizeRide} from "@/components/map/location-utils";
import BackButton from "@/components/common/back-button";

export default function Home() {
  const router = useRouter()
  const rideId = String(router.query.rideId)
  const [intervalCounter, setIntervalCounter] = useState(0)
  const currentRide = api.rider.currentRide.useQuery({id: rideId, driver: false}, { enabled: false });
  const cancelRide = api.rider.cancelRide.useMutation()
  const ride = humanizeRide(currentRide.data as HumanizedRide)

  const handleOnCancel = async () => {
    cancelRide.mutate({id: rideId, status: 'canceled'})
    void router.push("/rider")
  }

  useEffect(() => {
    if(rideId && ride.status !== 'canceled') {
      void currentRide.refetch()
      setTimeout(() => {
        setIntervalCounter((counter) => counter+1)
      }, 5000)
    }
  }, [rideId, intervalCounter])
  return (
    <DefaultPage title="Rider Riding">
      <Map pickupCoords={ride.pickup} dropoffCoords={ride.dropoff}/>
      <BackButton float href="/rider" />
      <RiderRidingSection {...ride} onCancel={handleOnCancel}/>
    </DefaultPage>
  );
}
