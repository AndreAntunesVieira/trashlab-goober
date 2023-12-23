import Map from "@/components/map/map.component";
import DefaultPage from "@/layouts/default-page";
import {api} from "@/utils/api";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {humanizeRide} from "@/components/map/location-utils";
import DriverConfirmSection from "@/components/sections/driver-confirm-section/driver-confirm-section.component";
import BackButton from "@/components/common/back-button";

export default function Home() {
  const router = useRouter()
  const rideId = String(router.query.rideId)
  const currentRide = api.rider.currentRide.useQuery({id: rideId, driver: true}, { enabled: false });
  const cancelRide = api.rider.cancelRide.useMutation()
  // @ts-ignore
  const ride = humanizeRide(currentRide.data)

  useEffect(() => {
    const interval = setInterval(() => {
      void currentRide.refetch()
    }, 5000)
    return () => clearInterval(interval)
  }, []);

  const updateStatus = (status: string) => cancelRide.mutate({id: rideId, status})
  const handleOnReject = async () => updateStatus('canceled')
  const handleOnAccept = async () => updateStatus('started')


  useEffect(() => {
    if(rideId) void currentRide.refetch()
  }, [rideId])
  return (
    <DefaultPage title="Driver Riding">
      <Map pickupCoords={ride.pickup} dropoffCoords={ride.dropoff}/>
      <BackButton float href="/driver" />
      <DriverConfirmSection {...ride} onReject={handleOnReject} onAccept={handleOnAccept}/>
    </DefaultPage>
  );
}
