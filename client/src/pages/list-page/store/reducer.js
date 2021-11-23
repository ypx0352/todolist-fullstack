import { fromJS } from "immutable";
import { actionTypes } from ".";
const defaultState = fromJS({
  name: "",
  todos: [
    {
      _id: "1",
      content: "Loading ...",
      finish: false,
      createdAt: "",
      updatedAt: "",
    },
    {
      _id: "2",
      content: "Loading ...",
      finish: false,
      createdAt: "",
      updatedAt: "",
    },
    {
      _id: "3",
      content: "Loading ...",
      finish: false,
      createdAt: "",
      updatedAt: "",
    },
  ],
  showError: false,
  errorMessage: "",
  showSuccess: false,
  successMessage: "",
  showDetail: false,
  showDetailItem_id: "",
});

const returnNewStateToStore = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZE:
      return state.merge({
        name: action.name,
        todos: action.todos,
      });

    case actionTypes.FINISH:
      const { item_id, finish, updatedAt } = action;
      const newTodos = state.get("todos").map((item) => {
        if (item.get("_id") === item_id) {
          return fromJS({
            _id: item_id,
            content: item.get("content"),
            finish: finish,
            createdAt: item.get("createdAt"),
            updatedAt: updatedAt,
          });
        }
        return item;
      });
      return state.set("todos", newTodos);

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

    case actionTypes.DELETE_ITEM:
      const newTodos_1 = state
        .get("todos")
        .filter((item) => item.get("_id") !== action.item_id);
      return state.set("todos", newTodos_1);

    case actionTypes.ADD_TODOS:
      return state.set("todos", fromJS([...state.get("todos"), action.todo]));

    case actionTypes.SHOW_DETAIL:
      return state.merge({
        showDetail: action.showDetail,
        showDetailItem_id: action.showDetailItem_id,
      });

    default:
      return state;
  }
};

export default returnNewStateToStore;
