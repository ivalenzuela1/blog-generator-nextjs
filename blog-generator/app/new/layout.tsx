import React from "react";
export const metadata = {
  title: "New post | Blogger",
  description: "New Blog",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
