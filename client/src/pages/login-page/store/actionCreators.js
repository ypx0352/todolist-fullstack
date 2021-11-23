import { fromJS } from "immutable";
import { actionTypes } from ".";
import axios from "axios";

export const changeShowPasswordAction = (value) => ({
  type: actionTypes.SHOW_PASSWORD,
  value: fromJS(!value),
});

export const changeShowSignUpAction = (value) => ({
  type: actionTypes.SHOW_SIGNUP,
  value: fromJS(!value),
});

export const signUpAction = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:1100/api/register", {
        name: name,
        email: email,
        password: password,
      });
      const { result } = response.data;
      localStorage.setItem("token", result.token);
      dispatch({
        type: actionTypes.SHOW_SIGNUP,
        value: fromJS(false),
      });
      dispatch({
        type: actionTypes.SHOW_SUCCESS,
        showSuccess: fromJS(true),
        successMessage: fromJS("Registered successfully, please login."),
      });
    } catch (error) {
      const { msg } = error.response.data;
      dispatch({
        type: actionTypes.SHOW_ERROR,
        showError: fromJS(true),
        errorMessage: fromJS(msg),
      });
    }
  };
};

export const showErrorAction = (showError, errorMessage) => ({
  type: actionTypes.SHOW_ERROR,
  showError: fromJS(showError),
  errorMessage: fromJS(errorMessage),
});

export const showSuccessAction = (showSuccess, successMessage) => ({
  type: actionTypes.SHOW_SUCCESS,
  showSuccess: fromJS(showSuccess),
  successMessage: fromJS(successMessage),
});

export const loginAction = (email, password, rememberMe) => {
  return async (dispatch) => {
    try {
      const response = await axios
        .post("http://localhost:1100/api/login", {
          email: email.toLowerCase(),
          password: password,
          rememberMe: rememberMe,
        })
        .catch((err) => {
          const { msg } = err.response.data;
          dispatch({
            type: actionTypes.SHOW_ERROR,
            showError: fromJS(true),
            errorMessage: fromJS(msg),
          });
        });
      const { success, result } = response.data;
      if (success) {
        localStorage.setItem("token", result.token);
        if (rememberMe) {
          localStorage.setItem("name", result.name);
        }
        dispatch({
          type: actionTypes.LOGIN,
          value: fromJS(true),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const rememberMeAction = (rememberMe) => ({
  type: actionTypes.REMEMBER_ME,
  value: fromJS(rememberMe),
});

export const continueLoginAction = () => ({
  type: actionTypes.LOGIN,
  value: fromJS(true),
});
