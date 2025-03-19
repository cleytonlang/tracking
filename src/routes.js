import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Driver Imports
import DriverDashboard from "views/driver/DriverDashboard";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdDirectionsCar,
  MdDeliveryDining,
  MdLogout,
} from "react-icons/md";

const routes = [
  // Auth routes (must come first for redirect purposes, but hidden from menu)
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
    invisible: true, // This marks the route as invisible in the menu
  },
  
  // Admin routes
  {
    name: "Orders",
    layout: "/admin",
    path: "orders",
    icon: <MdHome className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Admin Logout",
    layout: "/admin",
    path: "logout",
    icon: <MdLogout className="h-6 w-6" />,
    component: <SignIn />,
    navLink: "/auth/sign-in",
  },
  
  // Driver routes
  {
    name: "My Orders",
    layout: "/driver",
    path: "dashboard",
    icon: <MdDeliveryDining className="h-6 w-6" />,
    component: <DriverDashboard />,
  },
  {
    name: "Driver Profile",
    layout: "/driver",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Driver Logout",
    layout: "/driver",
    path: "logout",
    icon: <MdLogout className="h-6 w-6" />,
    component: <SignIn />,
    navLink: "/auth/sign-in",
  },
];
export default routes;
