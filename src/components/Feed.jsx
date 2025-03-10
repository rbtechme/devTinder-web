import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import BASE_URL from "../constants/baseUrl";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 4;

  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.users));
    } catch (error) {}
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed) return;

  if (feed.length === 0)
    return (
      <>
        <div className="flex justify-center mt-10 font-extrabold">
          <h1>No Dev Profile For You</h1>
        </div>
      </>
    );

  /*const totalPage = Math.ceil(feed.length / itemPerPage);
  const currentFeed = feed.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };*/

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 mx-10 my-10">
        {feed &&
          <UserCard user={feed[0]} />
        }
      </div>
      {/* <div className="flex justify-center items-center">
        <button
          className="btn btn-secondary text-white font-mono m-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="m-2 font-medium">
          page {currentPage} of {totalPage}
        </span>
        <button
          className="btn btn-primary text-white font-mono m-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default Feed;
