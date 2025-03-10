import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../constants/baseUrl";
import { addConnection } from "../utils/connectionSlice";

const Connection = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <>
        <div className="flex justify-center mt-10 font-extrabold">
          <h1>No Connection Found</h1>
        </div>
      </>
    );

  return (
    <>
      <div>
        <h1 className="flex text-5xl mt-10 text-slate-800 justify-center underline">
          Connection
        </h1>
        {connections.map((connections) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            connections.userData;
          return (
            <div className="flex justify-center">
              <div className="flex mx-10 m-4 bg-base-300 w-1/3 rounded-lg">
                <figure className="flex-shrink-0 flex items-center justify-center m-2">
                  <img
                    className="rounded-full w-32 h-32"
                    src={photoUrl}
                    alt="User"
                  />
                </figure>
                <div className="text-left m-4">
                  <h1 className="text-2xl font-extrabold">{firstName + " " + lastName}</h1>
                  <h1 className="text-2xl">{age + ", " + gender}</h1>
                  <p className="text-justify font-light">{about}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connection;
