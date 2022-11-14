import { Box, Button, FormControl, FormLabel, Input, useColorMode, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { fetchPosts } from "../../../actions/PostActions";
import { AuthContext } from "../../../context/AuthContext";
import { PostContext } from "../../../context/PostContext";

export default function Addcommentform(props) {
  const [comment, setComment] = useState("");
  const { userState } = useContext(AuthContext);
  const { dispatch } = useContext(PostContext);
  const { colorMode } = useColorMode();

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment === "") {
      return;
    } else {
      await axios.post(`https://whiteboard-backend-3000.herokuapp.com/comment/${userState.user.id}/${props.postId}`, {
        content: comment,
      });

      setComment("");
      fetchPosts(dispatch);
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack>
        <FormControl id="comment" display="flex" alignItems="center">
          <FormLabel htmlFor="comment" m={0} mr={2}>
            <img
              src="https://png.pngitem.com/pimgs/s/4-40070_user-staff-man-profile-user-account-icon-jpg.png"
              alt="profile"
              style={{
                maxWidth: "30px",
                maxHeight: "30px",
                borderRadius: "50%",
              }}
            />
          </FormLabel>
          <Input
            name="comment"
            placeholder="Add a comment ..."
            onChange={handleChange}
            required
            bg={colorMode === "light" ? "gray.200" : "gray.700"}
          />
          <Button type="submit" colorScheme="teal" variant="outline" borderRadius="50%" ml={2} p={1}>
            {<BsFillArrowRightCircleFill />}
          </Button>
        </FormControl>
      </VStack>
    </form>
  );
}

//   return (
//     <div>
//       <Form onSubmit={handleSubmit} onChange={handleChange}>
//         <Form.Group className="d-flex justify-content-center align-items-center gap-2 mt-3">
//           <img
//             src="https://png.pngitem.com/pimgs/s/4-40070_user-staff-man-profile-user-account-icon-jpg.png"
//             alt="profile"
//             style={{
//               width: "30px",
//               height: "30px",
//               borderRadius: "50%",
//             }}
//           />
//           <Form.Control
//             type="text"
//             placeholder="Add a comment ..."
//             name="comment"
//             className="border-0 rounded-5"
//           />
//           <Button type="submit" className="bg-transparent border-0 p-0">
//             <BsFillArrowRightCircleFill className="fs-2" />
//           </Button>
//         </Form.Group>
//       </Form>
//     </div>
//   );
// }
