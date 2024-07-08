import React, { useId, useState } from "react";
import authservice from "../appwrite/auth";
import { login } from "../store/Auth";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Inputcomp, Button } from "./Index";

function SignUp() {
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const create = async (data) => {
    seterror("");
    try {
      const userdata = await authservice.createAccount(data);
      console.log(userdata);
      if (userdata) {
        const userData = await authservice.getcurrentUSer();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      seterror(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          signUp for create a account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline capitalize"
          >
            login
          </Link>
        </p>

        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-10">
            <Inputcomp
              type="text"
              label="full name"
              placeholder="enter your name"
              {...register("name", {
                required: true,
              })}
            ></Inputcomp>
          </div>
          <div className="space-y-8">
            <Inputcomp
              label="email"
              placeholder="enter your email"
              type="email"
              {...register("email", {
                required: true,
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
              })}
            ></Inputcomp>
            <Button
              type="submit"
              name={"Create Account"}
              txtcolor="text-white"
              bgcolor="bg-green-500"
              hoverbgcolor="text-white"
              hovertxtcolor="text-green-500"
              className="ms-36"
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
