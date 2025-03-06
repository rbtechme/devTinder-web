import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../constants/baseUrl";
import { removeFeed } from "../utils/feedSlice";
import { useState } from "react";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const [isSendRequest, setIsSendRequest] = useState(false);
  const [isIgnoreRequest, setIsIgnoreRequest] = useState(false);

  const sendRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/sendConnectionRequest/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      if(status === "interested"){
        setIsSendRequest(true);
        setTimeout(() => {
          setIsSendRequest(false);
        }, 5000);
      }
      if(status === "ignore"){
        setIsIgnoreRequest(true);
        setTimeout(() => {
          setIsIgnoreRequest(false);
        }, 5000);
      }
     
      dispatch(removeFeed(id));
    } catch (error) {
    }
  };

  return (
    <div key={_id} className="card bg-base-300 w-96 shadow-sm">
      <figure className="flex-shrink-0">
        <img className="w-48 rounded-full" src={photoUrl} alt="User" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>
          {age}, {gender}
        </p>

        <p className="text-justify mt-5 mb-5">{about}</p>
        <div className="card-actions justify-between">
          <button
            onClick={() => sendRequest("ignore", user._id)}
            className="btn bg-red-500 text-white hover:bg-red-300"
          >
            ignore
          </button>
          <button
            onClick={() => sendRequest("interested", user._id)}
            className="btn bg-green-500 text-white hover:bg-green-300"
          >
            interested
          </button>
        </div>
      </div>
      {isSendRequest && (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <span>interested Sent Successfully.</span>
          </div>
        </div>
      )}
       {isSendRequest && (
        <div className="toast toast-end">
          <div className="alert alert-danger">
            <span>Ignore profile.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
