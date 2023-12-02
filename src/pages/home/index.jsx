import React from "react";
import { useParams } from "react-router-dom";
import Page from "../../components/Page";
import HomePage from "../../components/home-page";
import Notificationpage from "../../components/notification";
import Profile from "../../components/profile";
import UserList from "../../components/user-list";
import Logout from "../../components/logout";

const Home = () => {
  const { page_id } = useParams();

  return (
    <div>
      <Page>
        {(() => {
          switch (page_id) {
            case "home":
              return <HomePage />;
            case "profile":
              return <Profile />;
            case "user-list":
              return <UserList />;
            case "notification":
              return <Notificationpage />;
            case "logout":
              return <Logout />;
            default:
              return "404 - Not Found";
          }
        })()}
      </Page>
    </div>
  );
};

export default Home;
