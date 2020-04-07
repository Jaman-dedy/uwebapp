import {
  GET_INTERNAL_CONTACTS_START,
  GET_INTERNAL_CONTACTS_SUCCESS,
  GET_INTERNAL_CONTACTS_ERROR,
} from 'constants/action-types/vouchers/internalContacts';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetContactList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_INTERNAL_CONTACTS_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_INTERNAL_CONTACTS_SUCCESS,
          payload: {
            data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_INTERNAL_CONTACTS_ERROR,
          payload: error,
        });
      },
    }),
  );