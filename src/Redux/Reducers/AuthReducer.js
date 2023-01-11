import { AuthConstants } from "../Constants/AuthConstants";
const intialState = {
  userid: "",
};

export const AuthReducer = (state = intialState, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case AuthConstants.SET_USER_ID:
      return {
        ...state,
        userid: payload,
      };
    default:
      return state;
  }
};
