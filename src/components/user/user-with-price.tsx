import UserFull from "@/components/user/user-full";
import {type User} from "@/components/user/user.types";

interface UserWithPriceProps {
  user: User
  price: number
}

export default function UserWithPrice({user, price}: UserWithPriceProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <UserFull vertical {...user}/>
      <div>
        ${price.toFixed(2)}
      </div>
    </div>
  )
}
