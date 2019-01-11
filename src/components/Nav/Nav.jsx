import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Nav.css";

function Nav(props) {
  return (
    <div className="side-nav">
      <div>
        <div id="profile-pic">
          <img src={props.profile_pic} alt="" />
        </div>
        <h3>{props.username}</h3>
      </div>
      <Link to={"/dashboard"}>
        <div>Home</div>
      </Link>
      <Link to={"/new"}>
        <div>New Post</div>
      </Link>
      <Link to={"/"}>
        <div>Logout</div>
      </Link>
    </div>
  );
}

function mapStateToProps(store) {
  const { username, profile_pic } = store;
  return { username, profile_pic };
}

export default connect(mapStateToProps)(Nav);
