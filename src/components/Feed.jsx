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
      console.log(res.data);
      dispatch(addFeed(res.data.users));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

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
