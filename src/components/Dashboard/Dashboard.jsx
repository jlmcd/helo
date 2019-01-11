import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {Link} from 'react-router-dom'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      userPosts: true,
      posts: []
    };
  }

  handleChange(prop, evt) {
    this.setState({
      [prop]: evt.target.value
    });
  }

  componentDidMount() {
    this.getPosts();
  }

  checkBox() {
    this.setState({
      userPosts: !this.state.userPosts
    });
  }

  async getPosts() {
    const { id } = this.props;
    const { userPosts, searchInput: search } = this.state;
    let posts = [];
    let queryString = `/api/posts?id=${id}`
    if (search !== '') {
      queryString = queryString + `&search=${search}`
    }
    if (userPosts) {
      queryString = queryString + `&userPosts=true`
    } else {
      queryString = queryString + `&userPosts=false`
    }
    try {
      posts = await axios.get(queryString);
      this.setState({ posts: posts.data });
    } catch (e) {
      console.log(e);
    }
  }

  resetSearch(id) {
    this.getPosts()
    this.setState({ searchInput: '' })
  }

  render() {
    return (
      <div>
        <div className="search-bar">
          <input
            type="text"
            onChange={e => this.handleChange("searchInput", e)}
            value={this.state.searchInput}
            placeholder="Search by Title"
          />
          <button onClick={() => this.getPosts()}>Search</button>
          <button onClick={() => this.resetSearch()}>Reset</button>
          <span>
            My Posts
            <input type="checkbox" defaultChecked onChange={() => this.checkBox()} />
          </span>
        </div>
        {this.state.posts.map(post => (
          <Link key={post.id} to={`/post/${post.id}`}>
            <div className='mini-post'>
              <h1>{post.title}</h1>
              <h3>by {post.username}</h3>
              <img src={post.profile_pic} alt="" />
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

function mapStateToProps(store) {
  const { id } = store;
  return { id };
}

export default connect(mapStateToProps)(Dashboard);
