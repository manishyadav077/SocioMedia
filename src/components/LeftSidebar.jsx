import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "./NavLinks";
import { Button } from "./ui/button";
import authService from "../appwrite/auth";
import { logout } from "../store/authSlice";

const LeftSidebar = () => {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSignOut = () => {
    try {
      authService.logout().then(() => {
        dispatch(logout());
        navigate("/sign-up");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="./src/assets/logo.png"
            alt="logo"
            width={90}
            height={36}
            className="rounded-lg"
          />
        </Link>

        <Link
          to={`/profile/${userData?.$id}`}
          className="flex gap-3 items-center"
        >
          <img
            src={
              userData?.imageUrl ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="h-14 w-14 rounded-lg"
          />
          <div className="flex flex-col">
            <p className="body-bold">{userData?.name}</p>
            <p className="small-regular text-light-3">@{userData?.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-2">
          {sidebarLinks?.map((link) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link?.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-[#ec166c]"
                }`}
              >
                <NavLink
                  to={link?.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link?.imgURL}
                    alt={link?.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link?.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={(e) => handleSignOut(e)}
      >
        <img src="logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
