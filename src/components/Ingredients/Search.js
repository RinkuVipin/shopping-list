import React, { useEffect, useRef, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  //Props
  const { setSearchResult } = props;
  //State to Store Search Keyword
  const [searchName, setSearchName] = useState("");
  //Create Ref
  const searchRef = useRef();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchName === searchRef.current.value) {
        const params =
          searchName.length === 0
            ? ""
            : `?orderBy="name"&equalTo="${searchName}"`;
        fetch(
          "https://biller-app-d0f61.firebaseio.com/shoppinglist.json" + params
        )
          .then((response) => response.json())
          .then((responseData) => {
            const itemList = [];
            for (const key in responseData) {
              itemList.push({
                id: key,
                name: responseData[key].name,
                quantity: responseData[key].quantity,
              });
            }
            setSearchResult(itemList);
          });
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchName, setSearchResult]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            ref={searchRef}
            value={searchName}
            onChange={(event) => setSearchName(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
