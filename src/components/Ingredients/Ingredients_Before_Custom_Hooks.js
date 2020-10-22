import React, { useCallback, useMemo, useReducer } from "react";
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

const httpReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return { isLoading: true, error: null };
    case "RESPONSE":
      return { ...state, isLoading: false };
    case "ERROR":
      return { isLoading: false, error: action.errorMessage };
    case "CLEAR":
      return { ...state, error: null, isLoading: false };
    default:
      throw new Error("Soemthing went wrong");
  }
};

const Ingredients = () => {
  //Initializing the State using useState()
  //const [items, setItems] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState("");

  //Using useReducer for state changes
  const [items, dispatchItems] = useReducer(itemsReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    isLoading: false,
    error: null,
  });

  //Loads the Billing List
  // useEffect(() => {
  //   fetch("https://biller-app-d0f61.firebaseio.com/shoppinglist.json")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((responseData) => {
  //       const itemList = [];
  //       for (const key in responseData) {
  //         itemList.push({
  //           id: key,
  //           name: responseData[key].name,
  //           quantity: responseData[key].quantity,
  //         });
  //       }
  //       setItems(itemList);
  //     });
  // }, []);

  //Adding a new item to the Items list
  const addItem = useCallback((item) => {
    //USING USESTATE
    //setIsLoading(true);

    //USING USEREDUCER
    dispatchHttp({ type: "SEND" });
    fetch("https://biller-app-d0f61.firebaseio.com/shoppinglist.json", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "appication/json" },
    })
      .then((response) => {
        //USING USESTATE
        //setIsLoading(false);

        //USING USEREDUCER
        dispatchHttp({ type: "RESPONSE" });
        return response.json();
      })
      .then((responseData) => {
        //USING USESTATE
        // setItems((prevItems) => [
        //   ...prevItems,
        //   { id: responseData.name, ...item },
        // ]);

        //USING USEREDUCER
        dispatchItems({
          type: "ADD",
          newItem: { id: responseData.name, ...item },
        });
      })
      .catch((error) => {
        //USING USESTATE
        // setError("Oops!! Something went wrong.");
        // setIsLoading(false);

        //USING USEREDUCER
        dispatchHttp({ type: "ERROR" });
      });
  }, []);

  //Remove a item from the Items list
  const removeItem = useCallback((itemId) => {
    //USING USESTATE
    // setIsLoading(true);

    //USING USEREDUCER
    dispatchHttp({ type: "SEND" });

    fetch(
      `https://biller-app-d0f61.firebaseio.com/shoppinglist/${itemId}.json`,
      {
        method: "delete",
      }
    )
      .then((response) => {
        //USING USESTATE
        //setIsLoading(false);
        //setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

        //USING USEREDUCER
        dispatchHttp({ type: "RESPONSE" });
        dispatchItems({
          type: "DEL",
          deleteId: itemId,
        });
      })
      .catch((error) => {
        //USING USESTATE
        // setError("Oops!! Something went wrong.");
        // setIsLoading(false);

        //USING USEREDUCER
        dispatchHttp({ type: "ERROR" });
      });
  }, []);

  //Displays the Search Result
  const setSearchResult = useCallback((searchResult) => {
    //USING USESTATE
    //setItems(searchResult);

    //USING USEREDUCER
    dispatchItems({
      type: "SET",
      items: searchResult,
    });
  }, []);

  //Clears the Error
  const clearError = () => {
    //USING USESTATE
    // setError(null);
    // setIsLoading(false);

    //USING USEREDUCER
    dispatchHttp({ type: "CLEAR" });
  };

  //Creates MEMO to avoid unnecessary rerendering
  const ingredientList = useMemo(() => {
    return <IngredientList items={items} removeItem={removeItem} />;
  }, [items, removeItem]);
  return (
    <div className="App">
      {httpState.error && (
        <ErrorScreen onClose={clearError}>{httpState.error}</ErrorScreen>
      )}

      <IngredientForm addItem={addItem} isLoading={httpState.isLoading} />

      <section>
        <Search setSearchResult={setSearchResult} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
