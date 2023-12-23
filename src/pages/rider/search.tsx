import Map from "@/components/map/map.component";
import DefaultPage from "@/layouts/default-page";
import RiderSearchSection from "@/components/sections/rider-search-section/rider-search-section.component";
import {type FormEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Home() {
  const router = useRouter()
  const [pickup, setPickup] = useState<[number, number]>([0,0])
  const [dropoff, setDropoff] = useState<[number, number]>([0,0])
  const handleOnChangePickup = (coords:[number, number]) => {
    setPickup(coords)
  }
  const handleOnChangeDropoff = (coords:[number, number]) => {
    setDropoff(coords)
  }
  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if(pickup && dropoff) void router.push(`/rider/confirm?pickup=${pickup.join(',')}&dropoff=${dropoff.join(',')}`)
  }
  useEffect(() => {
    setTimeout(() => {
      document.getElementById("pickup")?.focus()
    }, 1000)
  }, [])
  return (
    <DefaultPage title="Rider Riding">
      <RiderSearchSection onChangePickup={handleOnChangePickup} onChangeDropoff={handleOnChangeDropoff} onSubmit={handleOnSubmit}/>
      <Map pickupCoords={pickup} dropoffCoords={dropoff}/>
    </DefaultPage>
  );
}
