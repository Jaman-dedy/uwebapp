import {
  GET_USER_INFO_START,
  GET_USER_INFO_ERROR,
  GET_USER_INFO_SUCCESS,
} from 'constants/action-types/users/getUserInfo';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_USER_INFO_START:
      return {
        ...state,
        userData: {
          ...state.userData,
          loading: true,
          error: null,
        },
      };
    case GET_USER_INFO_ERROR:
      return {
        ...state,
        userData: {
          ...state.userData,
          error: payload,
          loading: false,
        },
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userData: {
          ...state.userData,
          error: null,
          loading: false,
          data: payload.data[0],
        },
      };
    default:
      return null;
  }
};