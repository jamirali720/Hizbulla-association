import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/home/Home";

import NotFound from "../components/pages/NotFound";
import Dashboard from "../components/Dashboard/Dashboard";

import Authentication from "../components/pages/Authentication";

import Profile from "../components/pages/Profile";

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
            path: "registration",
            element: <RegistrationForm />,
          },

          {
            path: "Management",
            element: <ManageUsers />,
          },
          {
            path: "update-user/:userId",
            element: <UpdatedUser />,
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
            path: "profile",
            element: <Profile />,
          },
          // {
          //   path: "order/:orderId",
          //   element: <UpdateOrder />,
          // },
          {
            path: "add-committe/:committeeId",
            element: <AddCombinedCommittee />,
          },
          {
            path: "committees",
            element: <CommitteeList />,
          },

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
