import React, { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { IoHome } from "react-icons/io5";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaUsers,
} from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxLine } from "react-icons/ri";
import imagProfile from "../../assets/FB_IMG_1734733939208.jpg";
import { AuthContext } from "../AuthContext/AuthContext";
export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const {userData}:any = useContext(AuthContext);
  const navigate =useNavigate();
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const logoutFun = ()=>{
    localStorage.clear();
    navigate("/login")
  }
  return (
    <div className="siddbarContainer vh-100">
      <Sidebar collapsed={collapsed} className="vh-100 ">
        {collapsed ? (
          <FaArrowAltCircleRight
            onClick={toggleCollapse}
            size={25}
            className="m-2"
          />
        ) : (
          <FaArrowAltCircleLeft
            onClick={toggleCollapse}
            size={25}
            className="m-2"
          />
        )}
        <div className="text-center my-4">
          <img
            className={`${collapsed ? "immageCollapse" : "imagePorfile"}`}
            src={userData?.image || imagProfile}
            alt="profile image"
          />
          <h6 className={`${collapsed ? "sidebarTitle" : "py-4"}`}>
            {userData?.firstName || "Tarek"} {userData?.lastName||"Mohamed"} 
          </h6>
          <h6
            className={`${
              collapsed ? "sidebarDesc text-warning" : "text-warning"
            }`}
          >
            Admin
          </h6>
        </div>
        <Menu>
          <MenuItem icon={<IoHome />} component={<Link to="/dashboard" />}>
            Home
          </MenuItem>
          <MenuItem
            icon={<FaUsers />}
            component={<Link to="/dashboard/user-list" />}
          >
           
            Users
          </MenuItem>
          <MenuItem
            icon={<IoIosPersonAdd />}
            component={<Link to="/dashboard/add-user" />}
          >
        
            Add User
          </MenuItem>
          <MenuItem
            icon={<CgProfile />}
            component={<Link to="/dashboard/profile" />}
          >
            Profile
          </MenuItem>
          <MenuItem icon={<RiLogoutBoxLine />} onClick={logoutFun}>
            Log out
          </MenuItem>
        </Menu>
      </Sidebar>
      ;
    </div>
  );
}
