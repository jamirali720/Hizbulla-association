import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/home/Home";

import NotFound from "../components/pages/NotFound";
import Dashboard from "../components/Dashboard/Dashboard";

import Authentication from "../components/pages/Authentication";
import DashboardHome from "../components/Dashboard/DashboardHome";
import RegistrationForm from "../components/pages/RegistrationForm";

import ManageUsers from "./../components/Dashboard/ManageUsers";
import UpdatedUser from "../components/Dashboard/UpdatedUser";

import CommitteeList from "./../components/Dashboard/CommitteeList";
import UpdatedCommittee from "../components/Dashboard/UpdatedCommittee";
import AddCombinedCommittee from "../components/Dashboard/AddCombinedCommittee";
import UnionUpdatedCommittee from "../components/Dashboard/UnionUpdatedCommittee";
import WardUpdatedCommittee from "../components/Dashboard/WardUpdatedCommittee";
import UpazilaUpdatedCommittee from "../components/Dashboard/UpazilaUpdatedCommittee";
import UpdateUserRole from "../components/Dashboard/UpdateUserRole";
import AddTalim from "../components/Dashboard/AddTalim";
import AllTalimsDisplayed from "../components/Dashboard/AllTalimsDisplayed";

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
            element: <DashboardHome />,
          },
          {
            path: "talim",
            element: <AddTalim />,
          },
          {
            path: "all-talims",
            element: <AllTalimsDisplayed />,
          },
          {
            path: "user-registration",
            element: <RegistrationForm />,
          },

          {
            path: "user-Management",
            element: <ManageUsers />,
          },
          {
            path: "update-user/:userId",
            element: <UpdatedUser />,
          },
          {
            path: "update-role/:userId",
            element: <UpdateUserRole />,
          },
          {
            path: "update-committee",
            element: <UpdatedCommittee />,
            children: [
              {
                path: "upazila/:committeeId",
                element: <UpazilaUpdatedCommittee />,
              },
              {
                path: "union/:committeeId",
                element: <UnionUpdatedCommittee />,
              },
              {
                path: "ward/:committeeId",
                element: <WardUpdatedCommittee />,
              },
            ],
          },
          {
            path: "add-committe/:committeeId",
            element: <AddCombinedCommittee />,
          },
          {
            path: "committees",
            element: <CommitteeList />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
