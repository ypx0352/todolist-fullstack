import { connect } from "react-redux";
import { actionCreators } from "./store";
import { useRef } from "react";
import { Redirect } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  PageWrapper,
  ChooseContainer,
  FunctionContainer,
  StyledH1,
  InputItem,
  Btn,
  InputWrapper,
  InputItemWrapper,
  StyledP,
  RememberMeContainer,
  CheckBox,
} from "./style";

const LoginPage = (props) => {
  const {
    showSignUp,
    handleSwitchShowSignUp,
    showPassword,
    handleShowPassword,
    handleSignUp,
    errorMessage,
    showError,
    login,
    handleLogin,
    handleRememberMe,
    rememberMe,
    reSetShowError,
    showSuccess,
    successMessage,
    reSetShowSuccess,
  } = props;

  const nameEl = useRef(null);
  const emailEl = useRef(null);
  const passwordEl = useRef(null);

  const toastError = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    reSetShowError();
  };

  const toastSuccess = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    reSetShowSuccess();
  };

  if (showError) {
    toastError(errorMessage);
  }

  if (showSuccess) {
    toastSuccess(successMessage);
  }

  const displayShowPasswordIcon = (show) => {
    return show ? (
      <span
        className="iconfont icon-show-password "
        onClick={() => handleShowPassword(showPassword)}
      ></span>
    ) : (
      <span
        className="iconfont icon-show-password1  "
        onClick={() => handleShowPassword(showPassword)}
      ></span>
    );
  };

  // switch instructional content between login and signin
  const chooseContainer = (show) => {
    return show ? (
      <ChooseContainer className={showSignUp ? "left" : "right"}>
        <StyledH1>Welcome Back!</StyledH1>
        <StyledP>
          To keep connected with us please login with your personal info
        </StyledP>
        <Btn onClick={() => handleSwitchShowSignUp(show)}>SIGN IN</Btn>
      </ChooseContainer>
    ) : (
      <ChooseContainer className={showSignUp ? "left" : "right"}>
        <StyledH1>Hello, Friend!</StyledH1>
        <StyledP>Enter your personal details and start journey with us</StyledP>
        <Btn onClick={() => handleSwitchShowSignUp(show)}>SIGN UP</Btn>
      </ChooseContainer>
    );
  };

  // switch functional content between login and signin
  const functionContainer = (show) => {
    return show ? (
      <FunctionContainer className={showSignUp ? "right" : "left"}>
        <StyledH1>Create Account</StyledH1>
        <InputWrapper>
          <InputItemWrapper>
            <span className="iconfont icon-email1 "></span>
            <InputItem placeholder=" Email" type="email" ref={emailEl} />
          </InputItemWrapper>
          <InputItemWrapper>
            <span className="iconfont icon-login_mima "></span>
            <InputItem
              placeholder=" Password"
              type={showPassword ? "text" : "password"}
              ref={passwordEl}
            />
            {displayShowPasswordIcon(showPassword)}
          </InputItemWrapper>
          <InputItemWrapper>
            <span className="iconfont icon-login_zhanghu "></span>
            <InputItem placeholder=" Name" type="text" ref={nameEl} />
          </InputItemWrapper>
        </InputWrapper>
        <Btn
          onClick={() =>
            handleSignUp(
              nameEl.current.value.trim(),
              emailEl.current.value.trim(),
              passwordEl.current.value.trim()
            )
          }
        >
          SIGN UP
        </Btn>
      </FunctionContainer>
    ) : (
      <FunctionContainer className={showSignUp ? "right" : "left"}>
        <StyledH1>Sign In</StyledH1>
        <InputWrapper>
          <InputItemWrapper>
            <span className="iconfont icon-email1 "></span>
            <InputItem ref={emailEl} placeholder=" Email" type="email" />
          </InputItemWrapper>
          <InputItemWrapper>
            <span className="iconfont icon-login_mima "></span>
            <InputItem
              ref={passwordEl}
              placeholder=" Password"
              type={showPassword ? "text" : "password"}
            />
            {displayShowPasswordIcon(showPassword)}
          </InputItemWrapper>
        </InputWrapper>
        <RememberMeContainer>
          <CheckBox
            onChange={(element) => {
              handleRememberMe(element.target.checked);
              // if checked, show alert to users
              element.target.checked &&
                toast.warn(
                  "Keep you logged in for 24 hours. Do not check this option on public devices.",
                  {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
            }}
          />
          <StyledP>Remember me</StyledP>
        </RememberMeContainer>
        <Btn
          onClick={() =>
            handleLogin(
              emailEl.current.value.trim(),
              passwordEl.current.value.trim(),
              rememberMe
            )
          }
        >
          SIGN IN
        </Btn>
      </FunctionContainer>
    );
  };

  return (
    <PageWrapper>
      {chooseContainer(showSignUp)}
      {functionContainer(showSignUp)}
      {login ? <Redirect to="/list"></Redirect> : ""}
      <ToastContainer />
    </PageWrapper>
  );
};

const mapState = (state) => ({
  showSignUp: state.getIn(["login", "showSignUp"]),
  showPassword: state.getIn(["login", "showPassword"]),
  showError: state.getIn(["login", "showError"]),
  errorMessage: state.getIn(["login", "errorMessage"]),
  login: state.getIn(["login", "login"]),
  rememberMe: state.getIn(["login", "rememberMe"]),
  showSuccess: state.getIn(["login", "showSuccess"]),
  successMessage: state.getIn(["login", "successMessage"]),
});

const mapDispatch = (dispatch) => ({
  handleSwitchShowSignUp(value) {
    dispatch(actionCreators.changeShowSignUpAction(value));
  },

  handleShowPassword(value) {
    dispatch(actionCreators.changeShowPasswordAction(value));
  },

  handleSignUp(name, email, password) {
    if (!name || !email || !password) {
      dispatch(
        actionCreators.showErrorAction(true, "All input must not be null.")
      );
    } else {
      dispatch(actionCreators.signUpAction(name, email, password));
    }
  },

  reSetShowError() {
    dispatch(actionCreators.showErrorAction(false, ""));
  },

  reSetShowSuccess() {
    dispatch(actionCreators.showSuccessAction(false, ""));
  },

  handleLogin(email, password, rememberMe) {
    if (!email || !password) {
      dispatch(
        actionCreators.showErrorAction(true, "All input must not be null.")
      );
    } else {
      dispatch(actionCreators.loginAction(email, password, rememberMe));
    }
  },

  handleRememberMe(rememberMe) {
    dispatch(actionCreators.rememberMeAction(rememberMe));
  },

  handleContinueLogin() {
    dispatch(actionCreators.continueLoginAction());
  },
});

export default connect(mapState, mapDispatch)(LoginPage);
