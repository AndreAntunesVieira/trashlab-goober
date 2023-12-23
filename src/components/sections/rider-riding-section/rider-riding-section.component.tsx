import UserWithPrice from "@/components/user/user-with-price";
import Notification from "@/components/common/notification";
import {type Driver} from "@/components/user/user.types";

interface RiderRidingSectionProps {
  driver?: Driver
  status?: string
  startsAt?: Date
  price?: number
  duration: number
  distance: number
  pickup?: string
  dropoff?: string

  onCancel(event: any): void
}

export default function RiderRidingSection({
                                             driver,
                                             status,
                                             startsAt,
                                             price = 0,
                                             duration,
                                             distance,
                                             pickup,
                                             dropoff,
                                             onCancel
                                           }: RiderRidingSectionProps) {
  return (
    <div className="flex flex-col gap-4 min-w-max p-4 w-full text-primary">
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-2xl">
          Driver found
        </h2>
        <div className="flex p-2 w-full bg-secondary items-center rounded-lg">
          <div className="flex flex-col grow" title={`from ${pickup}, to ${dropoff},\n Travel started at: ${startsAt?.toLocaleString()}`}>
            <div>
              Duration: {Math.round(duration)} minutes
            </div>
            <div>
              Distance: {distance.toFixed(2)} km
            </div>

            <div>
              {driver?.licensePlate}
            </div>
          </div>
          {driver && <UserWithPrice user={driver} price={price}/>}
        </div>
        {status === 'requested' && <Notification icon="warning">
          Waiting driver to accept...
        </Notification>}
        {status === 'started' && <Notification icon="success">
          Driver accepted! Riding started
        </Notification>}

        {status === 'canceled' && <Notification icon="error">
          This riding was canceled
        </Notification>}

        {status !== 'canceled' &&
          <button className="bg-red-500 text-white p-2 w-full" disabled={status == 'canceled'} onClick={onCancel}>
            Cancel
          </button>}
      </div>
    </div>
  )
}
