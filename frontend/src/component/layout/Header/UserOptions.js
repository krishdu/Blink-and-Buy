import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Profile from "../../../images/profile.png";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logoutAction } from "../../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const ordersHandler = () => {
    history.push("/orders");
  };

  const accountHandler = () => {
    history.push("/account");
  };

  const logoutHandler = () => {
    dispatch(logoutAction());
    alert.success("Logout successfully");
  };

  const dashboardHandler = () => {
    history.push("/dashboard");
  };

  const cartHandler = () => {
    history.push("/cart");
  };

  const options = [
    { icon: <ListAltIcon />, name: "Orders", handler: ordersHandler },
    { icon: <PersonIcon />, name: "Profile", handler: accountHandler },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Bag(${cartItems.length})`,
      handler: cartHandler,
    },
    { icon: <ExitToAppIcon />, name: "Logout", handler: logoutHandler },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      handler: dashboardHandler,
    });
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className="speedDial"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        style={{ zIndex: "11" }}
        icon={
          <img
            src={user.avatar.url ? user.avatar.url : Profile}
            alt="profile_picture"
            className="speedDialIcon"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.handler}
            tooltipOpen="true"
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
