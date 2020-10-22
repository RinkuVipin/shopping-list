import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import useHttp from "../hooks/useHttp";
import ErrorScreen from "../UI/ErrorModal";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const itemsReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.items;
    case "ADD":
      return [...state, action.newItem];
    case "DEL":
      return state.filter((item) => item.id !== action.deleteId);
    default:
      throw new Error("Soemthing went wrong");
  }
};

const Ingredients = () => {
  const [items, dispatchItems] = useReducer(itemsReducer, []);
  const {
    isLoading,
    error,
    data,
    requestType,
    extraDetail,
    sendHttpRequest,
    clearError,
  } = useHttp();

  useEffect(() => {
    if (!isLoading && !error) {
      if (requestType === "DELETE")
        dispatchItems({ type: "DEL", deleteId: extraDetail });
      else if (requestType === "ADD")
        dispatchItems({
          type: "ADD",
          newItem: { id: data.name, ...extraDetail },
        });
    }
  }, [isLoading, error, requestType, extraDetail, data]);

  //Adding a new item to the Items list
  const addItem = useCallback(
    (item) => {
      sendHttpRequest(
        "https://biller-app-d0f61.firebaseio.com/shoppinglist.json",
        "POST",
        JSON.stringify(item),
        item,
        "ADD"
      );
    },
    [sendHttpRequest]
  );

  //Remove a item from the Items list
  const removeItem = useCallback(
    (itemId) => {
      sendHttpRequest(
        `https://biller-app-d0f61.firebaseio.com/shoppinglist/${itemId}.json`,
        "delete",
        null,
        itemId,
        "DELETE"
      );
    },
    [sendHttpRequest]
  );

  //Displays the Search Result
  const setSearchResult = useCallback((searchResult) => {
    dispatchItems({
      type: "SET",
      items: searchResult,
    });
  }, []);

  //Creates MEMO to avoid unnecessary rerendering
  const ingredientList = useMemo(() => {
    return <IngredientList items={items} removeItem={removeItem} />;
  }, [items, removeItem]);

  return (
    <div className="App">
      {error && <ErrorScreen onClose={clearError}>{error}</ErrorScreen>}
      <IngredientForm addItem={addItem} isLoading={isLoading} />
      <section>
        <Search setSearchResult={setSearchResult} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
