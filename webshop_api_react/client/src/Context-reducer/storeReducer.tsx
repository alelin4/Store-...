export const initialState = {
  total: 0,
  products: [],
};
type Action = {
  type: "add" | "remove" | "update price";
  payload: any;
};

const storeReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        products: action.payload,
      };
    case "remove":
      return {
        ...state,
        products: action.payload,
      };
    case "update price":
      return {
        ...state,
        total: action.payload,
      };
    default:
      throw Error("cannot match case in reduce");
  }
};

export default storeReducer;
