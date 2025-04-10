import React from "react";
import Banner from "../component/Banner/Banner";
import CoinTable from "../component/Banner/CoinTable";

function HomePage() {
  return (
    <div>
      <div>Welcome to the Home Page</div>;
      <Banner />
      <CoinTable />
    </div>
  );
}

export default HomePage;
