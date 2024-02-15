import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetLoginState } from "../redux/feature/auth/loginSlice";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token: isLoggedIn, name } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(resetLoginState());

    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 p-4 w-full ">
      <div className=" mx-auto flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center">
          {/* Three bars icon */}
          {isLoggedIn && (
            <button
              className=" text-white mr-4 lg:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <CiMenuBurger className="h-6 w-6" />
            </button>
          )}

          {/* Logo */}
          <div className="text-white font-bold text-lg">BMD</div>
        </div>

        {/* Right side */}
        <div className="flex items-center">
          <>
            <button
              className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={handleLogout}
            >
              Log Out
            </button>
            <div className="flex items-center">
              {/* User avatar icon with name */}
              <div className="text-white mr-2">{name}</div>
              <FaRegUserCircle className="h-8 w-8" />
            </div>
          </>
        </div>
      </div>

      {/* Mobile Menu */}
      {isLoggedIn && isOpen && (
        <div className=" flex justify-center lg:hidden mt-2">
          <ul className=" flex bg-gray-800">
            <Link to="/add-product">
              <li className="text-white py-2 px-4 hover:bg-gray-700">
                Add Product
              </li>
            </Link>
            <Link to="/products">
              <li className="text-white py-2 px-4 hover:bg-gray-700">
                Add Product
              </li>
            </Link>
            <Link to="/history">
              <li className="text-white py-2 px-4 hover:bg-gray-700">
                Add Product
              </li>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
