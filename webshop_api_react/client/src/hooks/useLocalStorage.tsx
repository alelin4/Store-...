/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue: any) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
