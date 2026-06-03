import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProtectedLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default ProtectedLayout;