import { RefObject, useEffect } from 'react';

const useComponentAwareClick = (
    ref: RefObject<HTMLElement>,
    onClick: (clickedOnComponent: boolean, clickedOnException: boolean) => void,
    clickExceptionClasses: string[] = []
) => {
    const handleClick = (event: MouseEvent) => {
        if (ref.current) {
            const target = event.target as HTMLElement;
            const clickedInsideComponent = ref.current.contains(target);
            const clickedOnException = clickExceptionClasses.some((c) =>
                target.classList.contains(c)
            );

            onClick(clickedInsideComponent, clickedOnException);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
};

export default useComponentAwareClick;
