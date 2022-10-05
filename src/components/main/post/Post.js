import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContext";
import { PostContext } from "../../../context/PostContext";
import Addpostform from "./Add-post-form";
import Comment from "./Comment";
import Deletepost from "./Delete-post";
import Editpost from "./Edit-post";

import "../../Style.css";

export default function Post() {
  const { posts, showPosts } = useContext(PostContext);
  const { isAuth, canDo } = useContext(AuthContext);

  return isAuth ? (
    <div>
      {canDo("create", null) && <Addpostform posts={showPosts} />}

      {posts &&
        posts.map((post, index) => (
          <Card
            className="my-5 mx-auto p-3 border-0 rounded-4 post-card"
            key={index}
          >
            <Card.Body className="post-card-body">
              {canDo("delete", post.userId) && (
                <Deletepost post={post} posts={showPosts} />
              )}

              {canDo("update", post.userId) && (
                <Editpost post={post} posts={showPosts} />
              )}

              <div className="d-flex gap-3 align-items-center pb-2">
                <img
                  src="https://png.pngitem.com/pimgs/s/4-40070_user-staff-man-profile-user-account-icon-jpg.png"
                  alt="profile"
                  className="post-img"
                />
                <div>
                  <Card.Subtitle>{post.User.userName}</Card.Subtitle>
                  <Card.Text className="text-muted">
                    {new Date(post.createdAt)
                      .toLocaleString()
                      .split(",")[0]
                      .slice(0, 4)}{" "}
                    at {new Date(post.createdAt).toLocaleString().split(",")[1]}
                  </Card.Text>
                </div>
              </div>
              <Card.Title className="mt-2">{post.title}</Card.Title>
              <Card.Text className="post-content">{post.content}</Card.Text>
              <div>
                <Card.Subtitle className="mb-2 text-muted">
                  Comments
                </Card.Subtitle>
                <Comment
                  comments={post.Comments}
                  postId={post.id}
                  posts={showPosts}
                />
              </div>
            </Card.Body>
          </Card>
        ))}
    </div>
  ) : (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <h1 className="text-center">You are not authorized to view this page</h1>
    </div>
  );
}
