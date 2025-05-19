import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAToken } from "../redux/slices/adminSlice";
import { setDToken } from "../redux/slices/doctorSlice";

const Navbar = () => {
  const aToken = useSelector(state=>state.admin.aToken);
  const dToken = useSelector(state=>state.doctor.dToken);
  const navgate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    navgate("/");
    aToken && dispatch(setAToken(false));
    aToken && localStorage.removeItem("aToken");
    dToken && dispatch(setDToken(false));
    dToken && localStorage.removeItem("dToken");
  };
  return (
    <div className="flex justify-between items-center  sm:px-10 border-b  bg-white">
      <div className="flex items-center gap-2 text-xs ">
        <img className="w-20 sm:w-30" src={assets.Aashahospitallogo} alt="" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-teal-700 text-white text-sm px-10 py-2 rounded-full cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
