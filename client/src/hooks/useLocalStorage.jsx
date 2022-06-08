import { useEffect, useState } from "react";

const PREFIX = "what's-up-";

function useLocalStorage(key, initValue) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initValue === "function") {
      return initValue();
    } else {
      return initValue;
    }
  });

  useEffect(() => {
    if(!value)return
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [ value]);
  return [value, setValue];
}

export default useLocalStorage;
