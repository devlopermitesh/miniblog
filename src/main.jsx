import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  AuthLayout,
  Login,
  SignUp,
  Allpost,
  Addpost,
  Editpost,
  Home,
  Post,
} from "./componets/Index.js";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { login } from "./store/Auth.js";
const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication={true}>
            <Allpost></Allpost>
          </AuthLayout>
        ),
      },
      {
        path: "/add-posts",
        element: (
          <AuthLayout authentication={true}>
            <Addpost></Addpost>
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication={true}>
            <Editpost></Editpost>
          </AuthLayout>
        ),
      },
      {
        path: "all-posts/post/:slug",
        element: <Post></Post>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route}></RouterProvider>
  </Provider>
);
