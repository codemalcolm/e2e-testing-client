import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import Homepage from "../Pages/Homepage";
import PageWrapper from "../Layouts/PageWrapper";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageWrapper />,
      children: [
        { path: "", element: <Homepage /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
