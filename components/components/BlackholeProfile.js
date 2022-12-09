import React from "react";
import { createGlobalStyle } from "styled-components";
import EditProfile from "./Profile/EditProfile";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;

const Profile = function () {
  return (
    <div>
      <GlobalStyles />

      <section className="container main-cont mt-2">
        <EditProfile />
        <div className="spacer-20"></div>
      </section>
    </div>
  );
};
export default Profile;
