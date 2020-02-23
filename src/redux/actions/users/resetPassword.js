import {
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from 'constants/action-types/users/resetPassword';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/ResetUserPasswordAndPIN',
      data: {
        LastName: data.LastName,
        DOB: data.DOB,
        PhoneNumber: data.PhoneNumber,
        NewPIN: data.NewPIN,
        NewPassword: data.NewPassword,
        PID: data.PID,
        DOBSet: data.DOBSet,
        OTP: data.OTP,
        KYCDocSent: data.KYCDocSent,
        SecurityQuestionSet: data.SecurityQuestionSet,
        A1: data.A1,
        A2: data.A2,
        A3: data.A3,
        A4: data.A4,
        A5: data.A5,
      },
      onStart: () => dispatch =>
        dispatch({
          type: RESET_PASSWORD_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: {
            success: data[0].Result === 'Success',
            message: data[0].Description,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: RESET_PASSWORD_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
