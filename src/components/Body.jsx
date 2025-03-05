import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "./AppBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";
import BASE_URL from "../constants/baseUrl";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      
      dispatch(addUser(res.data.user));
    } catch (error) {
      if (error.status === 401){
        navigate("/login");
      }
      

    }
  };

  useEffect(() => {
    if (!userData){
      fetchUser();
    }
  }, []);


  return (
    <>
      <AppBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
