import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import MobileBottomNav from "../components/MobileBottomNav";

function ProtectedLayout() {
  return (
    <>
      <Navbar />

      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>

      <MobileBottomNav />
    </>
  );
}

export default ProtectedLayout;