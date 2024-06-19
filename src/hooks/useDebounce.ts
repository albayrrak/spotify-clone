import { useState, useEffect } from "react";
function useDebounce<T>(value: T, delay?: number) {

    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value)
        }, delay || 500)

        return () => {
            clearTimeout(timer)
        }


    }, [value, delay])

    return debounceValue
}

export default useDebounce