"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import React from "react";
import { BiCog, BiHome, BiListUl, BiPlus } from "react-icons/bi";
import { menuList } from "../../../../data/menuList";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { user } = useUser();
  const currentRoute = usePathname();
  console.log("currentRoute");
  console.log(currentRoute);

  const getIcon = (icon: string) => {
    switch (icon) {
      case "list":
        return <BiListUl />;
      case "plus":
        return <BiPlus />;
      case "cog":
        return <BiCog />;
      default:
        return <BiHome />;
    }
  };
  return (
    <>
      {user ? (
        <div className="bg-white border border-gray-100 py-2 flex flex-shrink-0 flex-row justify-around md:justify-start md:flex-col md:h-full md:w-32 z-10">
          {menuList.map((item, index) => (
            <div key={index}>
              <Link
                href={item.route}
                className="flex items-center cursor-pointer py-2 relative hover:bg-indigo-50 px-4 group rounded-lg"
              >
                <div className="flex items-center">
                  {currentRoute === item.route && (
                    <div className="h-full w-2 bg-indigo-600 hidden md:block rounded-full -left-1 absolute"></div>
                  )}
                  {currentRoute === item.route && (
                    <div className="h-2 w-full bg-indigo-600 block md:hidden rounded-full -top-3 left-0 absolute"></div>
                  )}
                  <span className="text-xl group-hover:text-indigo-600 text-gray-500">
                    {getIcon(item.icon)}
                  </span>
                  <span className="text-xl ml-2 group-hover:text-indigo-600 text-gray-500">
                    {item.text}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
