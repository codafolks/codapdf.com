import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number, callBack?: (value: T) => void): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // Cleanup the timeout when the value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  useEffect(() => {
    callBack?.(debouncedValue);
  }, [debouncedValue]);

  return debouncedValue;
}

export { useDebounce };
