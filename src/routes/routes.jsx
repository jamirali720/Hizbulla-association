import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/home/Home";

import NotFound from "../components/pages/NotFound";
import Dashboard from "../components/Dashboard/Dashboard";

import Authentication from "../components/pages/Authentication";

import Profile from "../components/pages/Profile";

import DashboardHome from "../components/Dashboard/DashboardHome";
import RegistrationForm from "../components/pages/RegistrationForm";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "auth",
        element: <Authentication />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <DashboardHome/>,
          },
          {
            path: "registration",
            element: <RegistrationForm/>,
          },
          // {
          //   path: "add-product",
          //   element: <AddProducts />,
          // },
          // {
          //   path: "all-products",
          //   element: <AllProducts />,
          // },
          // {
          //   path: "update-product/:productId",
          //   element: <UpdateProducts />,
          // },
          {
            path: "profile",
            element: <Profile />,
          },
          // {
          //   path: "order/:orderId",
          //   element: <UpdateOrder />,
          // },
          // {
          //   path: "add-team-member",
          //   element: <AddTeamMember />,
          // },
          // {
          //   path: "all-teams",
          //   element: <AllTeamMember />,
          // },
          // {
          //   path: "update-team/:teamId",
          //   element: <UpdateTeam />,
          // },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
