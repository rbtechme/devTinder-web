import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { emptyFeed, removeFeed } from "../utils/feedSlice";
import BASE_URL from "../constants/baseUrl";

const AppBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL+ "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      dispatch(emptyFeed());
      navigate("/login");
    } catch (error) {
    }
  };
  return (
    <>
      <div className="navbar top-0 bg-base-300">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl bg-purple-700 text-white hover:bg-purple-500"  to="/">
            Darak Darika
          </Link>
        </div>
        {user && (
          <div className="flex-none gap-2 mx-4">
            <p className="">Welcome, {user.firstName}</p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" to="/profile">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connection">Connection</Link>
                </li>
                <li>
                  <Link to="/premium">Premium</Link>
                </li>
                <li>
                  <Link to="/request">request</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AppBar;
