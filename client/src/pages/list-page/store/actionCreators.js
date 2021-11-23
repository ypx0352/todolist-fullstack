import { fromJS } from "immutable";
import { actionTypes } from ".";
import { actionTypes as loginActionTypes } from "../../login-page/store";
import axios from "axios";

export const initializeAction = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get("http://localhost:1100/api/list", config);
    const { result } = response.data;
    dispatch({
      type: loginActionTypes.LOGIN,
      value: fromJS(true),
    });
    dispatch({
      type: actionTypes.INITIALIZE,
      name: fromJS(result.name),
      todos: fromJS(result.todos),
    });
  } catch (error) {
    const { msg } = error.response.data;
    dispatch({
      type: actionTypes.SHOW_ERROR,
      showError: fromJS(true),
      errorMessage: fromJS(msg),
    });
    setTimeout(() => {
      dispatch({
        type: loginActionTypes.LOGIN,
        value: fromJS(false),
      });
    }, 5000);
  }
};

export const finishAction = (finish, item_id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: token },
      };
      const response = await axios.put(
        "http://localhost:1100/api/list",
        {
          finish: finish,
          item_id: item_id,
        },
        config
      );
      const { result } = response.data;
      dispatch({
        type: actionTypes.FINISH,
        item_id: item_id,
        finish: fromJS(finish),
        updatedAt: fromJS(result.updatedAt),
      });
      if (finish) {
        dispatch({
          type: actionTypes.SHOW_SUCCESS,
          showSuccess: fromJS(true),
          successMessage: fromJS("Congratulations! You just finished a task."),
        });
      }
    } catch (error) {
      const { msg } = error.response.data;
      setTimeout(() => {
        dispatch({
          type: loginActionTypes.LOGIN,
          value: fromJS(false),
        });
      }, 5000);
      dispatch({
        type: actionTypes.SHOW_ERROR,
        showError: fromJS(true),
        errorMessage: fromJS(msg),
      });
    }
  };
};

export const deleteAction = (item_id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: token },
      };
      await axios.delete(
        `http://localhost:1100/api/list?item_id=${item_id}`,
        config
      );
      dispatch({
        type: actionTypes.DELETE_ITEM,
        item_id,
      });
    } catch (error) {
      const { msg } = error.response.data;

      dispatch({
        type: actionTypes.SHOW_ERROR,
        showError: fromJS(true),
        errorMessage: fromJS(msg),
      });
      setTimeout(() => {
        dispatch({
          type: loginActionTypes.LOGIN,
          value: fromJS(false),
        });
      }, 5000);
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
  showError: fromJS(showSuccess),
  errorMessage: fromJS(successMessage),
});

export const addAction = (content) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: token },
      };
      const response = await axios.post(
        "http://localhost:1100/api/list",
        {
          content: content,
        },
        config
      );
      dispatch({
        type: actionTypes.ADD_TODOS,
        todo: response.data.result.todo,
      });
    } catch (error) {
      const { msg } = error.response.data;
      setTimeout(() => {
        dispatch({
          type: loginActionTypes.LOGIN,
          value: fromJS(false),
        });
      }, 5000);
      dispatch({
        type: actionTypes.SHOW_ERROR,
        showError: fromJS(true),
        errorMessage: fromJS(msg),
      });
    }
  };
};

export const handleLogoutAction = () => {
  localStorage.clear();
  return (dispatch) => {
    dispatch({
      type: loginActionTypes.LOGIN,
      value: fromJS(false),
    });
  };
};

export const showDetailAction = (showDetail, showDetailItem_id) => ({
  type: actionTypes.SHOW_DETAIL,
  showDetail: fromJS(showDetail),
  showDetailItem_id: fromJS(showDetailItem_id),
});
