import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Addcommentform from "./Add-comment-form";
import Addpostform from "./Add-post-form";
import Deletepost from "./Delete-post";
import Editpost from "./Edit-post";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 1080px)").matches
  );

  const showPosts = async () => {
    const response = await axios.get(
      "https://whiteboard-backend-3000.herokuapp.com/post"
    );
    setPosts(response.data);
  };

  useEffect(() => {
    showPosts();

    const handler = (e) => setMatches(e.matches);
    window.matchMedia("(max-width: 1080px)").addListener(handler);
  }, []);

  return (
    <div>
      <Addpostform posts={showPosts} matches={matches} />

      {posts.map((post, index) => (
        <Card
          className="my-5 mx-auto p-3 border-0 rounded-4"
          style={
            matches
              ? { width: "75%", backgroundColor: "#242526" }
              : { width: "50%", backgroundColor: "#242526" }
          }
          key={index}
        >
          <Card.Body
            style={{
              padding: "10px",
              textAlign: "left",
            }}
          >
            <Deletepost posts={showPosts} id={post.id} />
            <Editpost posts={showPosts} id={post.id} />

            <div className="d-flex gap-3 align-items-center pb-2">
              <img
                src="https://png.pngitem.com/pimgs/s/4-40070_user-staff-man-profile-user-account-icon-jpg.png"
                alt="profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
              />
              <Card.Subtitle>Ahmad Jubran</Card.Subtitle>
            </div>
            <Card.Title className="mt-2">{post.title}</Card.Title>
            <Card.Text
              style={{
                borderBottom: "1px solid #444",
                paddingBottom: "10px",
                whiteSpace: "pre-line",
              }}
            >
              {post.content}
            </Card.Text>
            <div>
              <Card.Subtitle className="mb-2 text-muted">
                Comments
              </Card.Subtitle>
              {post.Comments.map((comment, index) => (
                <div
                  className="d-flex gap-2 py-2"
                  key={index}
                  style={
                    index === post.Comments.length - 1
                      ? {
                          borderBottom: "1px solid #444",
                        }
                      : {}
                  }
                >
                  <img
                    src="https://png.pngitem.com/pimgs/s/4-40070_user-staff-man-profile-user-account-icon-jpg.png"
                    alt="profile"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                  <div className="d-flex flex-column gap-1 pt-2">
                    <Card.Subtitle>Ahmad Jubran</Card.Subtitle>
                    <Card.Text
                      style={
                        index === post.Comments.length - 1
                          ? {
                              paddingBottom: "10px",
                            }
                          : {}
                      }
                    >
                      {comment.content}
                    </Card.Text>
                  </div>
                </div>
              ))}
              <Addcommentform id={post.id} posts={showPosts} />
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
