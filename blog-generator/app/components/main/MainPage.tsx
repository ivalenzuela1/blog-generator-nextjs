import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";

export default function MainPage() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row">
      <Content />
    </div>
  );
}
