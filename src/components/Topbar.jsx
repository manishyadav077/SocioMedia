import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { logout } from "../store/authSlice";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

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
    <div className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img src="./src/assets/logo.png" className="h-12 rounded-lg" />
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => handleSignOut()}
          >
            <img src="/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${userData?.$id}`} className="flex-center gap-3">
            <img
              src={
                userData?.imageUrl ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
