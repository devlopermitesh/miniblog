import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/Auth";
import authservice from "./appwrite/auth";
import { Outlet } from "react-router-dom";
import { Header, Footer, Container, Loading } from "./componets/Index";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  return !loading ? (
    <div className="absolute w-full h-full ">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  ) : (
    <Loading></Loading>
  );
}

export default App;
