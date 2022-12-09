import React from "react";
import { createGlobalStyle } from "styled-components";
import HoleStaking from "./HoleStaking";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;

const Staking = function () {
  return (
    <div>
      <GlobalStyles />

      <section className="container main-cont mt-2">
        < HoleStaking / >
        <div className="spacer-20"></div>
      </section>
    </div>
  );
};
export default Profile;
