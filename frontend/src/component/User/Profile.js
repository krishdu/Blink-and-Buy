import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import "./Profile.css";

const Profile = ({ history }) => {
  const { user, loading, isAutheticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAutheticated) {
      history.push("/login");
    }
  }, [isAutheticated, history]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Hi ${user.name}`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p> {user.name} </p>
              </div>
              <div>
                <h4>Email</h4>
                <p> {user.email} </p>
              </div>
              <div>
                <h4>Member Since</h4>
                <p> {String(user.createdAt).substring(0, 10)} </p>
              </div>
              <div>
                <Link to="/orders/me">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
