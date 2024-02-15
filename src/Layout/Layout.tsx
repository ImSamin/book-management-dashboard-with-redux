import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyTokenMutation } from "../redux/feature/auth/loginApi";
import {
  setName,
  setToken,
  setUsername,
} from "../redux/feature/auth/loginSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import MainContent from "./MainContent";
import Navbar from "./Navabar";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  const [verifyToken] = useVerifyTokenMutation();
  const authToken: string | null = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (authToken) {
          const verify = await verifyToken({
            token: authToken,
            secret: "very-secret",
          });

          if ("data" in verify) {
            const verifiedData = verify.data.data;
            dispatch(setToken(authToken));
            dispatch(setName(verifiedData.name));
            dispatch(setUsername(verifiedData.username));
          } else {
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        navigate("/login");
      }
    };

    if (!token) {
      fetchData();
    }
  }, [authToken, dispatch, verifyToken, navigate, token]);

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-100 p-4">
          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default Layout;
