import React from "react";
import Helmate from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmate>
      <title>{title}</title>
    </Helmate>
  );
};

export default MetaData;
