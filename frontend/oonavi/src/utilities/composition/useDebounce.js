import {ref} from "vue";
export default function useDebounce() {
    const timeOut = ref("");

    const debounce = (func, wait = 1000) => {
        clearTimeout(timeOut.value);
        timeOut.value = setTimeout(func, wait)
    }
    return {debounce}
}