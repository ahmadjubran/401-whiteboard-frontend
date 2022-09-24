import React from "react";
import { Card } from "react-bootstrap";
import Addcommentform from "./Add-comment-form";

export default function Comment(props) {
  return (
    <div>
      {props.comments.map((comment, index) => {
        return (
          <div
            className="d-flex gap-2 py-2"
            key={index}
            style={
              index === props.comments.length - 1
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
              <Card.Subtitle>{comment.User.userName}</Card.Subtitle>
              <Card.Text
                style={
                  index === props.comments.length - 1
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
        );
      })}
      <Addcommentform postId={props.postId} posts={props.posts} />
    </div>
  );
}
