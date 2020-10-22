import React from "react";

import "./IngredientList.css";

const IngredientList = (props) => {
  return (
    <section className="ingredient-list">
      <h2>Added Items</h2>
      <ul>
        {props.items.map((ig) => (
          <li key={ig.id} onClick={props.removeItem.bind(this, ig.id)}>
            <span>{ig.name}</span>
            <span>{ig.quantity}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
