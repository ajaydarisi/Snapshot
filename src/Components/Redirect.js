import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirect() {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  });
  return <div>Redirecting</div>;
}

export default Redirect;
