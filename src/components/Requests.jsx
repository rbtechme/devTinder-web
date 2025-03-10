import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../constants/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const requestFetch = async () => {
    const res = await axios.get(BASE_URL + "/user/request/received", {
      withCredentials: true,
    });
    dispatch(addRequests(res.data.connectionRequests));
  };

  useEffect(() => {
    requestFetch();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <>
        <div className="flex justify-center mt-10 font-extrabold">
          <h1>No Request Connection Found</h1>
        </div>
      </>
    );

  const requstHandler = async (status, id) => {
    const res = await axios.post(
      BASE_URL + "/sendConnectionReview/" + status + "/" + id,
      {},
      { withCredentials: true }
    );
    dispatch(removeRequest(id));
  };

  return (
    <>
      <div>
        <h1 className="flex text-5xl mt-10 text-slate-800 justify-center underline">
          Request Connection
        </h1>
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <div key={_id} className="flex justify-center">
              <div className="flex mx-10 m-4 bg-base-300 w-1/3 rounded-lg">
                <figure className="flex-shrink-0 flex justify-center items-center m-2">
                  <img
                    className="rounded-full w-32 h-32"
                    src={photoUrl}
                    alt="User"
                  />
                </figure>
                <div className="text-left m-4">
                  <h1 className="text-2xl font-extrabold">
                    {firstName + " " + lastName}
                  </h1>
                  <h1 className="text-2xl">{age + ", " + gender}</h1>
                  <p className="text-justify font-light">{about}</p>
                  <div className="mt-4">
                    <button
                      onClick={() => requstHandler("accepted", request._id)}
                      className="btn btn-secondary mx-4 text-white font-semibold"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => requstHandler("rejected", request._id)}
                      className="btn btn-primary mx-4 text-white font-semibold"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Requests;
