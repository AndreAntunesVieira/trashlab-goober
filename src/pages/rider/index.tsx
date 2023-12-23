import Map from "@/components/map/map.component";
import DefaultPage from "@/layouts/default-page";
import RiderDashboardSection from "@/components/sections/rider-dashboard-section/rider-dashboard-section.component";

export default function Home() {
  return (
    <DefaultPage title="Rider dashboard">
      <Map showUserPointer/>
      <RiderDashboardSection />
    </DefaultPage>
  );
}
