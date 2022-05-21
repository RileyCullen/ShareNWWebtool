import { useEffect } from "react";

/**
 * Code adapted from: 
 * https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
 * @param {*} ref Return value from useRef
 * @param {function} callback Callback function to be ran when outside click detected
 */
const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const HandleOutsideClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        document.addEventListener("mousedown", HandleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", HandleOutsideClick);
        }
    }, [ref]);
}

export default useOutsideClick;