import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AuthLayout = ({ children, authentication = true }) => {
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.Authreducer.status);
  console.log(`authentication:${authentication}`);
  console.log(`authStatus:${authStatus}`);

  useEffect(() => {
    //false && false!==false[false]=>(login pe navigate nahi honga)
    //true && true !==false[true]=>(login pe navigae honga)

    if (authentication && authStatus !== authentication) {
      console.log("moving to login ");
      navigate("/login");
    }
    //true && false!==false[false]
    else if (!authentication && authStatus !== authentication) {
      console.log("moving to home");

      navigate("/");
    } else {
      console.log("beda garg");
      console.log(children);
    }
    setloading(false);
  }, [authStatus, navigate, authentication]);
  return loading ? <h1>loading...</h1> : <> {children}</>;
};

export default AuthLayout;
