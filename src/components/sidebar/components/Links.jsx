/* eslint-disable */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
// chakra imports

export function SidebarLinks(props) {
  // Chakra color mode
  let location = useLocation();
  const navigate = useNavigate();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  // Determine current layout (admin or driver)
  const currentLayout = location.pathname.includes("/driver") ? "/driver" : "/admin";

  const createLinks = (routes) => {
    // Filter routes based on current layout and visibility
    const filteredRoutes = routes.filter(route => {
      // Skip invisible routes
      if (route.invisible) {
        return false;
      }
      
      // Include routes only if they match the current layout
      if (route.layout === currentLayout) {
        return true;
      }
      
      // Special case for auth routes - include only if they are not duplicated elsewhere
      if (route.layout === "/auth") {
        // Check if there's another route with the same name but different layout
        const duplicate = routes.find(r => 
          r.layout === currentLayout && 
          r.name === route.name
        );
        
        return !duplicate;
      }
      
      return false;
    });

    return filteredRoutes.map((route, index) => {
      const handleClick = (e) => {
        if (route.navLink) {
          e.preventDefault();
          navigate(route.navLink);
        }
      };

      return (
        <Link
          key={index}
          to={route.navLink || (route.layout + "/" + route.path)}
          onClick={route.navLink ? handleClick : undefined}
        >
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li
              className="my-[3px] flex cursor-pointer items-center px-8"
              key={index}
            >
              <span
                className={`${
                  activeRoute(route.path) === true
                    ? "font-bold text-brand-500 dark:text-white"
                    : "font-medium text-gray-600"
                }`}
              >
                {route.icon ? route.icon : <DashIcon />}{" "}
              </span>
              <p
                className={`leading-1 ml-4 flex ${
                  activeRoute(route.path) === true
                    ? "font-bold text-navy-700 dark:text-white"
                    : "font-medium text-gray-600"
                }`}
              >
                {route.name}
              </p>
            </li>
            {activeRoute(route.path) ? (
              <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
            ) : null}
          </div>
        </Link>
      );
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
