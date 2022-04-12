import React, { Fragment, useEffect, useRef, useState } from "react";
import "./LoginRegister.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/FaceRounded";
import ProfilePNG from "../../images/profile.png";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAction,
  registerUserAction,
  clearErrors,
} from "../../store/actions/userActions";
import { useAlert } from "react-alert";

const LoginRegister = ({ history, location }) => {
  const dispatch = useDispatch();
  const { loading, error, isAutheticated } = useSelector((state) => state.user);
  const alert = useAlert();

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const tabSwitcher = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(ProfilePNG);

  const redirectTo = location.search
    ? location.search.split("=")[1]
    : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAutheticated) {
      history.push(redirectTo);
    }
  }, [error, alert, dispatch, history, isAutheticated, redirectTo]);

  const switchTab = (e, tab) => {
    if (tab === "login") {
      tabSwitcher.current.classList.add("shiftToNeutral");
      tabSwitcher.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "register") {
      tabSwitcher.current.classList.add("shiftToRight");
      tabSwitcher.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(loginEmail, loginPassword));
  };

  const registerSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(registerUserAction(myForm));
  };

  const registerDetailsChangeHandler = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginRegisterContainer">
            <div className="LoginRegisterBox">
              <div>
                <div className="login-register-toggle">
                  <p onClick={(e) => switchTab(e, "login")}>Login</p>
                  <p onClick={(e) => switchTab(e, "register")}>Register</p>
                </div>
                <button ref={tabSwitcher}></button>
              </div>

              <form
                className="loginForm"
                ref={loginTab}
                onSubmit={loginSubmitHandler}
              >
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Enter e-mail..."
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Enter passwrod..."
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot"> Forget Password ? </Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>

              <form
                className="registerForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmitHandler}
              >
                <div className="registerName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Enter you name..."
                    name="name"
                    value={name}
                    onChange={registerDetailsChangeHandler}
                    required
                  />
                </div>
                <div className="registerEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Enter e-mail..."
                    name="email"
                    required
                    value={email}
                    onChange={registerDetailsChangeHandler}
                  />
                </div>

                <div className="registerPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Enter passwrod..."
                    name="password"
                    required
                    value={password}
                    onChange={registerDetailsChangeHandler}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="avatar preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDetailsChangeHandler}
                  />
                </div>
                <input type="submit" value="Register" className="registerBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginRegister;
