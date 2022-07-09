import { useEffect, useRef } from "react"

export const usePrevious = (val: any) => {
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = val;
  }, [val]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;

}