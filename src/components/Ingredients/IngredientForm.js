import React, { useState } from "react";
import Spinner from "../UI/LoadingIndicator";
import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  //Initializing a State
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    props.addItem({
      name: itemName,
      quantity: itemQuantity,
    });
  };

  //Handles the onChange Method on the Input Fields using setState() method if the State is a Object.
  // const [item, setItem] = useState({ itemName: "", itemQuantity: "" });
  // const changeInputHandler = (event) => {
  //   const inputValue = event.target.value;
  //   if (event.target.name === "title") {
  //     setItem((prevState) => ({
  //       itemName: inputValue,
  //       itemQuantity: prevState.itemQuantity,
  //     }));
  //   } else {
  //     setItem((prevState) => ({
  //       itemQuantity: inputValue,
  //       itemName: prevState.itemName,
  //     }));
  //   }
  // };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">NAME</label>
            <input
              type="text"
              id="title"
              value={itemName}
              name="title"
              onChange={(event) => setItemName(event.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="Quantity">QUANTITY</label>
            <input
              type="number"
              id="Quantity"
              value={itemQuantity}
              name="Quantity"
              onChange={(event) => setItemQuantity(event.target.value)}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Item</button>
            {props.isLoading && <Spinner />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
