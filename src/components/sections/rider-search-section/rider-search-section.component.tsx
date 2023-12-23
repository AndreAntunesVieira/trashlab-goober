import LocationForm from "@/components/map/location-form";
import BackButton from "@/components/common/back-button";
import Logo from "@/components/logo/logo";

interface RiderSearchSectionProps {
  onChangePickup(event: any): void
  onChangeDropoff(event: any): void
  onSubmit(event: any): void
}
export default function RiderSearchSection({onChangePickup, onChangeDropoff, onSubmit}: RiderSearchSectionProps) {
  return (
    <div className="flex flex-col gap-4 min-w-max bg-white p-4 w-full">
      <div className="flex justify-between">
        <BackButton href="/rider" tabIndex={4} />
        <Logo />
      </div>
      <form className="flex flex-col gap-4" onSubmit={onSubmit} method="post">
        <LocationForm name="pickup" placeholder="Enter pickup location" tabIndex={1} onChange={onChangePickup} />
        <LocationForm name="dropoff" placeholder="Where to?" tabIndex={2} onChange={onChangeDropoff}/>

        <button className="p-2 w-full bg-primary text-white" tabIndex={3}>
          Confirm locations
        </button>
      </form>
    </div>
  )
}
