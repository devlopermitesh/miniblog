import React from "react";
import { Container, Logoutbtn } from "../Index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authstatus = useSelector((state) => state.Authreducer.status);
  console.log(`authstatus :${authstatus}`);
  const navigator = useNavigate();
  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authstatus,
    },

    {
      name: "SignUp",
      path: "/signup",
      active: !authstatus,
    },
    {
      name: "All posts",
      path: "/all-posts",
      active: authstatus,
    },

    {
      name: "Add posts",
      path: "/add-posts",
      active: authstatus,
    },
  ];
  return (
    <header>
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to={"/"}>
              <h2>Dev UI</h2>
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((items) =>
              items.active ? (
                <li key={items.name}>
                  <button
                    onClick={() => {
                      navigator(items.path);
                    }}
                    className="hover:bg-blue-100 inline-block px-6 py-2 duration-200 rounded-full"
                  >
                    {items.name}
                  </button>
                </li>
              ) : null
            )}
            {authstatus && (
              <li>
                <Logoutbtn></Logoutbtn>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
