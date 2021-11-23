import { connect } from "react-redux";
import { useRef } from "react";
import { actionCreators } from "./store";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  PageWrapper,
  StyledH1,
  HeaderWrapper,
  StyledH3,
  LogoutBtn,
  StyledSpan,
  ListWrapper,
  ListItemWrapper,
  CheckBox,
  Content,
  ActionWrapper,
  DeleteBtn,
  InputWrapper,
  Input,
  InputBtn,
  ListRowWrapper,
  ListDetailWrapper,
  EmptyListWrapper,
} from "./style";

const ListPage = (props) => {
  const checkBoxEls = useRef([]);
  const inputEl = useRef(null);
  const {
    todos,
    handleCheckbox,
    handleAdd,
    name,
    showError,
    errorMessage,
    handleDelete,
    login,
    initialize,
    handleLogout,
    showDetailItem_id,
    handleShowDetail,
    showDetail,
    reSetShowError,
    reSetShowSuccess,
    showSuccess,
    successMessage,
  } = props;

  //alert users the success or error message
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

  //if the app doesn't know the user message, initialize the user
  initialize(name);

  //generate todolist items using list data stored in redux store
  const listTodos = () => {
    return todos.map((item, index) => {
      const createdDate = new Date(item.get("createdAt")).toLocaleString();
      const finishedDate = new Date(item.get("updatedAt")).toLocaleString();

      return (
        <ListRowWrapper key={item.get("_id")}>
          <ListItemWrapper>
            <CheckBox
              checked={item.get("finish")}
              ref={(element) => (checkBoxEls.current[index] = element)}
              onChange={(element) => {
                handleCheckbox(checkBoxEls.current[index], item.get("_id"));
              }}
            ></CheckBox>
            <Content className={item.get("finish") ? "finish" : ""}>
              {item.get("content")}
            </Content>
            <ActionWrapper>
              <DeleteBtn
                onClick={() => {
                  handleDelete(item.get("_id"));
                }}
              >
                Delete
              </DeleteBtn>
              {/* match item_id to show item detail  */}
              {showDetailItem_id === item.get("_id") && showDetail ? (
                <span
                  className="iconfont icon-cc-arrow-up-circle"
                  onClick={() => handleShowDetail(false, item.get("_id"))}
                />
              ) : (
                <span
                  className="iconfont icon-circle-down"
                  onClick={() => handleShowDetail(true, item.get("_id"))}
                />
              )}
            </ActionWrapper>
          </ListItemWrapper>
          <ListDetailWrapper
            className={
              showDetail && showDetailItem_id === item.get("_id") ? "" : "hide"
            }
          >
            <StyledSpan>Created at: {createdDate}</StyledSpan>
            <StyledSpan className={item.get("finish") ? "" : "hide"}>
              Finished at: {finishedDate}
            </StyledSpan>
          </ListDetailWrapper>
        </ListRowWrapper>
      );
    });
  };

  return (
    <div>
      {login ? "" : <Redirect to="/login" />}
      <PageWrapper className={todos.size === 0 ? "hidebgimage" : ""}>
        <HeaderWrapper>
          <StyledH3>Hi,</StyledH3>
          <StyledSpan>{name}</StyledSpan>
          <LogoutBtn onClick={() => handleLogout()}>Logout</LogoutBtn>
        </HeaderWrapper>
        <StyledH1>Todolist</StyledH1>
        <InputWrapper>
          <Input ref={inputEl} />
          <InputBtn onClick={() => handleAdd(inputEl)}>Add</InputBtn>
        </InputWrapper>
        {/* if there is no todo items, show a specific pic */}
        {todos.size !== 0 ? (
          <ListWrapper>{listTodos()}</ListWrapper>
        ) : (
          <EmptyListWrapper>
            <EmptyListWrapper>{listTodos()}</EmptyListWrapper>
            <StyledH3>All done! Have a good rest today.</StyledH3>
          </EmptyListWrapper>
        )}
      </PageWrapper>

      <ToastContainer />
    </div>
  );
};

const mapState = (state) => ({
  todos: state.getIn(["list", "todos"]),
  name: state.getIn(["list", "name"]),
  showError: state.getIn(["list", "showError"]),
  errorMessage: state.getIn(["list", "errorMessage"]),
  login: state.getIn(["login", "login"]),
  showDetail: state.getIn(["list", "showDetail"]),
  showDetailItem_id: state.getIn(["list", "showDetailItem_id"]),
  showSuccess: state.getIn(["list", "showSuccess"]),
  successMessage: state.getIn(["list", "successMessage"]),
});

const mapDispatch = (dispatch) => ({
  initialize(name) {
    if (!name) {
      dispatch(actionCreators.initializeAction);
    }
  },

  handleCheckbox(element, item_id) {
    dispatch(actionCreators.finishAction(element.checked, item_id));
  },

  handleAdd(element) {
    const inputValue = element.current.value;
    if (inputValue.length === 0) {
      dispatch(actionCreators.showErrorAction(true, "Please enter something."));
    } else {
      dispatch(actionCreators.addAction(inputValue));
      element.current.value = "";
    }
  },

  handleDelete(item_id) {
    dispatch(actionCreators.deleteAction(item_id));
  },

  handleLogout() {
    dispatch(actionCreators.handleLogoutAction());
  },

  handleShowDetail(show, item_id) {
    dispatch(actionCreators.showDetailAction(show, item_id));
  },

  reSetShowError() {
    dispatch(actionCreators.showErrorAction(false, ""));
  },

  reSetShowSuccess() {
    dispatch(actionCreators.showSuccessAction(false, ""));
  },
});

export default connect(mapState, mapDispatch)(ListPage);
