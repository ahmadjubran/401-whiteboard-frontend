import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import cookies from "react-cookies";
import Addpostform from "./Add-post-form";
import Comment from "./Comment";
import Deletepost from "./Delete-post";
import Editpost from "./Edit-post";

import "./Post.css";

export default function Post() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await axios.get(
      "https://whiteboard-backend-3000.herokuapp.com/post",
      {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      }
    );
    return response.data;
  };

  const getUsers = async () => {
    const response = await axios.get(
      "https://whiteboard-backend-3000.herokuapp.com/users",
      {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      }
    );
    return response.data;
  };

  const postsInfo = async () => {
    const posts = await getPosts();
    const users = await getUsers();

    const postsInfo = posts.map((post) => {
      const postUser = users.find((user) => user.User.id === post.userId);

      const commentsInfo = post.Comments.map((comment) => {
        const commentUser = users.find(
          (user) => user.User.id === comment.userId
        );
        return { ...comment, User: commentUser.User };
      });
      return { ...post, User: postUser.User, Comments: commentsInfo };
    });
    return postsInfo;
  };

  const showPosts = async () => {
    const posts = await postsInfo();
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setPosts(sortedPosts);
  };

  useEffect(() => {
    showPosts();
  }, []);

  return (
    <div>
      <Addpostform posts={showPosts} />

      {posts.map((post, index) => (
        <Card
          className="my-5 mx-auto p-3 border-0 rounded-4 post-card"
          key={index}
        >
          <Card.Body className="post-card-body">
            {post.User.id === Number(cookies.load("userId")) ? (
              <div>
                <Deletepost showPosts={showPosts} post={post} />
                <Editpost showPosts={showPosts} post={post} />
              </div>
            ) : null}

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
  );
}
