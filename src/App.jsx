import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Provider } from "react-redux";
import appStore from "./utils/store";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connection from "./components/Connection";
import Requests from "./components/Requests";
import Premium from "./components/Premium";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/connection" element={<Connection/>}></Route>
              <Route path="/request" element={<Requests/>}></Route>
              <Route path="/premium" element={<Premium/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
