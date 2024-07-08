import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login as authlogin } from "../store/Auth";
import { Container, Inputcomp, Button } from "./Index";
import authservice from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, seterror] = useState("");
  const login = async (data) => {
    console.log(`data from login.jsx`);
    console.log(data);
    seterror("");
    try {
      const session = await authservice.login(data);
      if (session) {
        const userdata = await authservice.getCurrentUser();
        console.log(userdata);
        if (userdata) {
          dispatch(authlogin(userdata));

          navigate("/");
        }
      }
    } catch (error) {
      seterror(error.message || "An unexpected error occurred");
    }
  };

  const emailPattern = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(value) || "Invalid email address";
  };

  const passwordPattern = (value) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return (
      regex.test(value) ||
      "Password must be at least 8 characters long and contain at least one letter and one number"
    );
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={
          "mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 "
        }
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          sign into your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          dont have any account ?
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline capitalize"
          >
            SIgn up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div className="space-y-8">
            <Inputcomp
              label="email"
              placeholder="enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  emailPattern,
                },
              })}
            ></Inputcomp>
          </div>
          <div className="space-y-3">
            <Inputcomp
              label="password"
              placeholder="enter your password"
              type="password"
              {...register("password", {
                required: true,
                validate: {
                  passwordPattern,
                },
              })}
            ></Inputcomp>
          </div>
          <Button
            type="submit"
            name={"Sign in"}
            txtcolor="text-white"
            bgcolor="bg-sky-500"
            hoverbgcolor="white"
            hovertxtcolor="text-sky-500"
            className="ms-36 mt-10"
          ></Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
