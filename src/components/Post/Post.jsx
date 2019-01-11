import React, { Component } from "react";
import Axios from "axios";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      img: "",
      content: "",
      username: "",
      profile_pic: ""
    };
  }

  componentDidMount() {
    this.getPost()
  }

  async getPost() {
    const {postid} = this.props.match.params
    const postInfo = await Axios.get(`/api/post/${postid}`)
    const {title, img, content, profile_pic, username} = postInfo.data[0]
    this.setState({
      title, img, content, profile_pic, username
    })
  }

  render() {
    const { title, img, content, username, profile_pic } = this.state;
    return (
      <div>
        <div className="post-info">
          <h1>{title}</h1>
          <img src={img} alt="" />
          <p>{content}</p>
        </div>
        <div className="poster">
          <h2>{username}</h2>
          <img src={profile_pic} alt="" />
        </div>
      </div>
    );
  }
}
