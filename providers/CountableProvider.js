import { createContext, useState, useEffect } from "react";

import { loadCountables, saveCountables } from "../storage/CountableStorage";

export const CountableContext = createContext({});

export const CountableProvider = ({ children }) => {
  const [countables, setCountables] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadCountables().then((result) => {
      setCountables(result);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveCountables(countables);
    }
  }, [countables, isLoaded]);

  const changeCount = (amount, index) => {
    const newState = [...countables];
    newState[index].count += amount;
    setCountables(newState);
  };

  const addNewCountable = (name) => {
    const newState = [...countables, { name, count: 0 }];
    setCountables(newState);
  };

  return (
    <CountableContext.Provider
      value={{ countables, changeCount, addNewCountable }}
    >
      {children}
    </CountableContext.Provider>
  );
};
