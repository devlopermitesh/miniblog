import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/Auth";
import authservice from "../../appwrite/auth";
const Logoutbtn = () => {
  const dispatch = useDispatch();
  const LogOutHandler = () => {
    authservice.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="hidden lg:block">
      <button
        type="button"
        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        onClick={LogOutHandler}
      >
        logout
      </button>
    </div>
  );
};

export default Logoutbtn;
