import { useState, useEffect } from "react";

export function useLocaleStorageState(initialVal, key) {
  const [value, setValue] = useState(function () {
    const internalData = localStorage.getItem(key);
    return initialVal ? JSON.parse(internalData) : initialVal;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}
