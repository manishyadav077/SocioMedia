import { Route, Routes, Navigate } from "react-router-dom";
import { SignUp, Login, AuthLayout } from "./pages/index";
import {
  Home,
  Layout,
 EditPost,
  Explore,
  Saved,
  Profile,
  CreatePost,
  UpdateProfile,
  PostDetails,
  AllUsers
} from "./components/index";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import authService from "./appwrite/auth";
import { useEffect, useState } from "react";

const App = () => {
  const status = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<Login />} />
        </Route>

        {/* private routes */}
        <Route element={status ? <Layout /> : <Navigate to="/sign-up" />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </main>
  ) : null;
};

export default App;
