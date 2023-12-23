import UserImage from "@/components/user/user-image";
import {type FormEvent, useEffect, useState} from "react";
import classNames from "classnames";
import {type Driver, type User} from "@/components/user/user.types";
import {emptyUser} from "@/components/user/user-utils";

interface RiderConfirmSectionProps {
  onSubmit(event: any): void
  dynamicMultiplier: number
  distance: number
  duration: number
  drivers: Driver[]
}
export default function RiderConfirmSection({ onSubmit, dynamicMultiplier, distance, duration, drivers }: RiderConfirmSectionProps) {
  const [driverSelected, setDriverSelected] = useState<User>(emptyUser())
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit?.(driverSelected)
  }
  useEffect(() => {
    if(drivers && drivers.length >= 1 && drivers[0]) setDriverSelected(drivers[0])
  }, [drivers]);
  return (
    <div className="flex flex-col gap-4 min-w-max bg-gradient-to-b from-[#FFFFFF] to-[#DDDDDD] p-4 w-full">
      <div className="flex justify-between">
        <div>
          <div>
            Dynamic price: <b
            style={{width: 32, height: 32}}

            className={classNames('items-center justify-center inline-flex rounded-full',{
              'text-green-500 bg-green-200': dynamicMultiplier === 1,
              'text-red-500 bg-red-200': dynamicMultiplier > 1
            })}
          ><small>x</small>{dynamicMultiplier}</b>
          </div>
          <div>
            Distance: {distance ? (distance).toFixed(2) : '...'} km,
            Time: {duration ? Math.round(duration) : '...'} min
          </div>
        </div>
      </div>
      <form action="#" method="post" onSubmit={handleSubmit}>

        <ul className="flex flex-col gap-4">
          {drivers.map((driver) => (
            <li key={driver.id} className={classNames("flex p-2 w-full  gap-2", {
              'bg-blue-100': driverSelected?.id !== driver.id,
              'bg-secondary': driverSelected?.id === driver.id
            })} onClick={() => {
              setDriverSelected(driver)
            }}>
              <UserImage image={driver.image}/>
              <div className="flex flex-col grow">
                <b>
                  Goober {driver.carCategory?.name}
                </b>
                <div>
                  {driver.name}
                </div>
              </div>
              <div>
                ${driver.price.toFixed(2)}
              </div>
            </li>
          ))}

          <button className="p-2 w-full bg-primary text-white" disabled={!driverSelected}>
            Confirm driver
          </button>
        </ul>
      </form>
    </div>
  )
}
