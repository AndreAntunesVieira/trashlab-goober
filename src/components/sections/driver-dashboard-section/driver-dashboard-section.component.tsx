import UserFull from "@/components/user/user-full";
import Logo from "@/components/logo/logo";
import {type User} from "@/components/user/user.types";

export default function DriverDashboardSection({ user }: { user: User }){
  return (
    <div className="flex flex-col gap-4 min-w-max bg-gradient-to-b from-[#FFFFFF] to-[#DDDDDD] p-4 w-full">
      <div className="flex justify-between">
        <Logo />
        <UserFull {...user} href="/" />
      </div>
      <div className="text-center">
        Searching riders...
      </div>
    </div>
  )
}
