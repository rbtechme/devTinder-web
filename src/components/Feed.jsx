import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get("http://localhost:7777/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.users));
    } catch (error) {}
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (feed.length === 0)
    return (
      <>
        <div className="flex justify-center mt-10 font-extrabold">
          <h1>No Dev Profile For You</h1>
        </div>
      </>
    );

  return (
    feed && (
      <div className="flex flex-wrap justify-center gap-4 m-10">
        {feed.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    )
  );
};

export default Feed;
