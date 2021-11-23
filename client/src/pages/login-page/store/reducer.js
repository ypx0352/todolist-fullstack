import { fromJS } from "immutable";
import { actionTypes } from ".";

const defaultState = fromJS({
  showSignUp: false,
  showPassword: false,
  showError: false,
  errorMessage: "error",
  showSuccess: false,
  successMessage: "",
  login: false,
  rememberMe: false,
});

const returnNewStateToStore = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_SIGNUP:
      return state.set("showSignUp", action.value);

    case actionTypes.SHOW_PASSWORD:
      return state.set("showPassword", action.value);

    case actionTypes.SHOW_ERROR:
      return state.merge({
        showError: action.showError,
        errorMessage: action.errorMessage,
      });

    case actionTypes.SHOW_SUCCESS:
      return state.merge({
        showSuccess: action.showSuccess,
        successMessage: action.successMessage,
      });

    case actionTypes.LOGIN:
      return state.set("login", action.value);

    case actionTypes.REMEMBER_ME:
      return state.set("rememberMe", action.value);

    default:
      return state;
  }
};

export default returnNewStateToStore;
