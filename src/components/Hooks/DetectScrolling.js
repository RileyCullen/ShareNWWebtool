import { useEffect } from "react";

const useScrollDetection = (callback) => {
    useEffect(() => {
        /**
         * Note that when an infographic is selected, most elements actually do
         * not support scrolling. So, to detect scrolling, we have to manually
         * add the callback to all scrollable elements.
         * 
         * Below is NOT an exhaustive list, it is a list of the elements needed
         * at the moment.
         */
        const canvasContainer = document.getElementById('canvas-container');
        const editor = document.getElementById('editor-content-scrollable');

        canvasContainer.addEventListener('scroll', callback);
        editor.addEventListener('scroll', callback);
        
        return () => {
            canvasContainer.removeEventListener('scroll', callback);
            editor.removeEventListener('scroll', callback);
        }
    });
};

export default useScrollDetection;