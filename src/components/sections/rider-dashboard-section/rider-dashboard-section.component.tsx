import Link from "next/link";
import Logo from "@/components/logo/logo";
import UserFull from "@/components/user/user-full";
import {useEffect, useState} from "react";
import {emptyUser, getAuthenticatedUser} from "@/components/user/user-utils";
import {type User} from "@/components/user/user.types";

export default function RiderDashboardSection(){
  const [user, setUser] = useState<User>(emptyUser())
  useEffect(() => {
    setUser(getAuthenticatedUser())
  }, [])
  return (
    <div className="flex flex-col gap-4 min-w-max bg-white bg- p-4 w-full">
      <div className="flex justify-between">
        <Logo/>
        <UserFull {...user} href="/" />
      </div>
      <div>
        <Link href="/rider/search">
          <div className="p-2 w-full bg-blue-100">
            Where to?
          </div>
        </Link>
      </div>
    </div>
  )
}
