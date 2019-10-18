import { default as navigationReducer, types as actionTypes, initialState } from "./index";

describe("REDUCER --- navigationReducer", () => {
  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = initialState;

    expect(navigationReducer(undefined, action)).toEqual(expected);
  });

  it("should handle FETCH_NAVIGATION_REQUEST", () => {
    const action = { type: actionTypes.FETCH_NAVIGATION_REQUEST };
    const expected = { ...initialState, isFetching: true };
    const newState = navigationReducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it("should handle FETCH_NAVIGATION_SUCCESS", () => {
    const action = { type: actionTypes.FETCH_NAVIGATION_SUCCESS, data: ["test"] };
    const expected = { ...initialState, data: action.data, isFetching: false, status: "success" };
    const newState = navigationReducer(initialState, action);

    expect(newState).toEqual(expected);
  });
  it("should handle FETCH_NAVIGATION_FAILURE", () => {
    const action = { type: actionTypes.FETCH_NAVIGATION_FAILURE, error: "error" };
    const expected = { ...initialState, error: action.error, status: "failure" };
    const newState = navigationReducer(initialState, action);

    expect(newState).toEqual(expected);
  });
  it("should handle RESET_NAVIGATION", () => {
    const action = { type: actionTypes.RESET_NAVIGATION };
    const expected = initialState;
    const newState = navigationReducer(initialState, action);

    expect(newState).toEqual(expected);
  });
});
