import React from "react";
import PageLayout from "./PageLayout";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const PageWrapper = () => {
  return (
    <>
      <Navbar />
      <PageLayout>
        <Outlet />
      </PageLayout>
    </>
  );
};

export default PageWrapper;
