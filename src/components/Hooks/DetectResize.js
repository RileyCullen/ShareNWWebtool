import { useEffect } from 'react';

const useResizeDetection = (callback) => {
    useEffect(() => {
        window.addEventListener('resize', callback);
        return () => {
            window.removeEventListener('resize', callback);
        };
    });
};

export default useResizeDetection;