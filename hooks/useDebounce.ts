import { useEffect, useState } from "react";

// Debounce hook
const useDebounce = (value: string, delay: number = 400) => {
  const [debounced, setDebounced] = useState<string>(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

export default useDebounce;
