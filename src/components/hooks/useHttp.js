import { useCallback, useReducer } from "react";

const initialState = {
  isLoading: false,
  error: null,
  requestType: null,
  data: null,
  extraDetail: null,
};

const httpReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return {
        isLoading: true,
        error: null,
        data: null,
        extraDetail: null,
        requestType: action.reqType,
      };
    case "RESPONSE":
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.responseData,
        extraDetail: action.extraData,
      };
    case "ERROR":
      return { isLoading: false, error: action.errorMessage };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("Soemthing went wrong");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clearError = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);

  const sendHttpRequest = useCallback(
    (requestUrl, requestMethod, requestBody, requestData, requestType) => {
      dispatchHttp({ type: "SEND", reqType: requestType });

      fetch(requestUrl, {
        method: requestMethod,
        body: requestBody,
        headers: { "Content-Type": "appication/json" },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          dispatchHttp({
            type: "RESPONSE",
            responseData: responseData,
            extraData: requestData,
          });
        })
        .catch((error) => {
          dispatchHttp({
            type: "ERROR",
            errorMessage: "Something went wrong!",
          });
        });
    },
    []
  );
  return {
    isLoading: httpState.isLoading,
    error: httpState.error,
    data: httpState.data,
    requestType: httpState.requestType,
    extraDetail: httpState.extraDetail,
    sendHttpRequest: sendHttpRequest,
    clearError: clearError,
  };
};

export default useHttp;
