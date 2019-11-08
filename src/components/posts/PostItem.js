import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postAction";

export class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }
  onLikeClick(id) {
    this.props.addLike(id);
  }
  onUnlikeClick(id) {
    this.props.removeLike(id);
  }
  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const { post, auth } = this.props;

    return (
      <div className="card card-body mb-3 shadow-2xl">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt={post.name}
              />
            </a>
            <br />
            <h5 className="text-center">{post.name}</h5>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button
              type="button"
              onClick={this.onLikeClick.bind(this, post._id)}
              className="btn btn-light mr-1"
            >
              <i
                className={classnames("fas fa-thumbs-up", {
                  "text-success": this.findUserLike(post.likes)
                })}
              />

              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button
              type="button"
              onClick={this.onUnlikeClick.bind(this, post._id)}
              className="btn btn-light mr-1"
            >
              <i className="text-danger fas fa-thumbs-down" />
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {post.user === auth.user.id ? (
              <button
                type="button"
                onClick={this.onDeleteClick.bind(this, post._id)}
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
}
PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
