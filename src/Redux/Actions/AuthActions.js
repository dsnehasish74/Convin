import { AuthConstants } from "../Constants/AuthConstants";

export const setUserId = (userid) => {
  return {
    type: AuthConstants.SET_USER_ID,
    payload: userid,
  };
};
