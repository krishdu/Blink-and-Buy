import React from "react";
import "./About.css";
import { Typography, Avatar } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://avatars.githubusercontent.com/u/37765333?s=400&u=9bce543ca75038162eb8af5785a416622dbc2456&v=4"
              alt="Founder"
            />
            <Typography>Krishnendu Patra</Typography>
            <span>
              This is a sample e-commerce wesbite made by me. It has built only
              with the purpose of learning MERN Stack development.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Find Me</Typography>
            <a href="https://www.github.com/krishdu" target="blank">
              <GitHubIcon className="gitHubSvgIcon" />
            </a>

            <a
              href="https://www.linkedin.com/in/krishnendu-patra"
              target="blank"
            >
              <LinkedInIcon className="linkedInSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
