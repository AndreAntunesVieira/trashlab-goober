import UserWithPrice from "@/components/user/user-with-price";
import DynamicMultiplier from "@/components/common/dynamic-multiplier";
import Notification from "@/components/common/notification";
import {type User} from "@/components/user/user.types";

interface DriverConfirmSectionProps {
  rider?: User
  dynamicMultiplier?: number
  status?: string
  price?: number
  duration: number
  distance: number
  pickup?: string
  dropoff?: string
  onReject(event: any): void
  onAccept(event: any): void
}
export default function DriverConfirmSection({
                                               rider,
                                               dynamicMultiplier,
                                               status,
                                               price = 0,
                                               duration,
                                               distance,
                                               pickup,
                                               dropoff,
                                               onReject,
                                               onAccept,
                                             }: DriverConfirmSectionProps) {
  return (
    <div className="flex flex-col gap-4 min-w-max bg-white p-4 w-full text-primary">
      <h2 className="text-center text-2xl">
        Rider found
      </h2>
      <div className="bg-secondary text-primary p-2">

        <div className="flex items-center">
          <div className="grow">

            <DynamicMultiplier multiplier={dynamicMultiplier ?? 1}/>
            <div>
              From: {pickup}
            </div>
            <div>
              To: {dropoff}
            </div>
            <div>
              Duration: {Math.round(duration)} minutes
            </div>
            <div>
              Distance: {distance.toFixed(2)} km
            </div>
          </div>
          {rider && <UserWithPrice user={rider} price={price}/> }
        </div>

      </div>
      {status === 'requested' &&
        <h2 className="text-center text-2xl">
          Do you accept this ride?
        </h2>
      }
      {status === 'canceled' && <Notification icon="error">
        This riding was canceled
      </Notification>}
      {status === 'requested' &&
        (<button className="bg-red-500 text-white p-2" onClick={onReject}>
          Reject ride
        </button>)
      }
      {status === 'started' &&
        (<button className="bg-red-500 text-white p-2" onClick={onReject}>
          Cancel
        </button>)
      }
      {status === 'requested' && (
        <button className="bg-primary text-white p-2" onClick={onAccept}>
          Accept Ride
        </button>
      )}
    </div>
  )
}
