import React, { Fragment, useContext } from "react";
import Card from "./components/UI/Card";
import Ingredients from "./components/Ingredients/Ingredients";
import { AuthContext } from "./components/AuthContext";
import Auth from "./components/Auth";
import "./App.css";

const App = (props) => {
  const authContext = useContext(AuthContext);
  let contents = <Auth />;
  if (authContext.isLoggedIn) contents = <Ingredients />;

  return (
    <Fragment>
      <section className="header-section">
        <Card>
          <h2>Add to Shopping List </h2>
        </Card>
      </section>
      {contents}
    </Fragment>
  );
};

export default App;
