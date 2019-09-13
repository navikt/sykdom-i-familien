import { RefObject, useState, useLayoutEffect } from 'react';

const getSize = (element: HTMLElement | null) => {
    return !element
        ? { width: 0, height: 0 }
        : {
              width: element.offsetWidth,
              height: element.offsetHeight
          };
};

const useComponentSize = (ref: RefObject<HTMLElement>) => {
    const [componentSize, setComponentSize] = useState(getSize(ref.current));

    useLayoutEffect(
        () => {
            if (ref.current) {
                setComponentSize(getSize(ref.current));
            }
        },
        [ref.current]
    );

    return componentSize;
};

export default useComponentSize;
