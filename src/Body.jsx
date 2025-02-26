import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";
import Footer from "./Footer";

const Body = () => {
  return (
    <>
      <AppBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
