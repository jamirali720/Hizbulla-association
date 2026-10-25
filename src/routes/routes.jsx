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
import AddCommittee from "../components/Dashboard/AddCommittee";
import CommitteeList from "./../components/Dashboard/CommitteeList";
import UpdatedCommittee from "../components/Dashboard/UpdatedCommittee";
import NewCommittee from "../components/committee/NewCommittee";
import UpazilaPage from "../components/committee/UpazilaPage";
import UnionPage from './../components/committee/UnionPage';
import WardPage from "../components/committee/WardPage";
import AddCombinedCommittee from "../components/Dashboard/AddCombinedCommittee";
import BangladeshLocationSelector from "../components/home/BangladeshLocationSelector";


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
        path: "location",
        element: <BangladeshLocationSelector />,
      },

      {
        path: "auth",
        element: <Authentication />,
      },
      
      {
        path: "new",
        element: <NewCommittee />,
        children: [
          {
            path: "upazilas",
            element: <UpazilaPage />,
          },
          {
            path: "unions",
            element: <UnionPage />,
          },
          {
            path: "wards",
            element: <WardPage />,
          },
        ]
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
            path: "update-committee/:committeeId",
            element: <UpdatedCommittee />,
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
            // element: <AddCommittee />,
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
