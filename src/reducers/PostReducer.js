import { actionType } from "../config/Constant";

export const PostReducer = (state, action) => {
  switch (action.type) {
    case actionType.REQUEST_POSTS:
      return {
        ...state,
        loading: true,
      };
    case actionType.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case actionType.FETCH_POSTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionType.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case actionType.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case actionType.UPDATE_POST:
      const updatedPost = action.payload;

      const updatedPosts = state.posts.map((post) => {
        if (post.id === updatedPost.id) {
          return updatedPost;
        }
        return post;
      });
      return {
        ...state,
        posts: updatedPosts,
      };
    default:
      return state;
  }
}