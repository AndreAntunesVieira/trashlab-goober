import Map from "@/components/map/map.component";
import DefaultPage from "@/layouts/default-page";
import DriverDashboardSection from "@/components/sections/driver-dashboard-section/driver-dashboard-section.component";
import {useEffect, useState} from "react";
import {api} from "@/utils/api";
import {useRouter} from "next/router";
import {emptyUser, getAuthenticatedUser} from "@/components/user/user-utils";
import {type User} from "@/components/user/user.types";

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<User>(emptyUser())
  const searchRiderRequest = api.rider.searchRiderRequest.useQuery({driverId: String(user.id)}, {enabled: false});

  useEffect(() => {
    setUser(getAuthenticatedUser())
    setInterval(() => {
      void searchRiderRequest.refetch()
    }, 5000)
  }, []);
  useEffect(() => {
    if (searchRiderRequest.data) {
      void router.push(`/driver/${searchRiderRequest.data.id}`)
      searchRiderRequest.remove()
    }
  }, [searchRiderRequest.data]);
  return (
    <DefaultPage title="Driver dashboard">
      <Map/>
      <DriverDashboardSection user={user}/>
    </DefaultPage>
  );
}
