import React from "react";
import Sidebar from "./Sidebar";
import "./css/Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1"> Dashboard </Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> 2000
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p> Product </p>
              <p> 50 </p>
            </Link>

            <Link to="/admin/orders">
              <p> Orders </p>
              <p> 73 </p>
            </Link>

            <Link to="/admin/users">
              <p> Users </p>
              <p> 150 </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
