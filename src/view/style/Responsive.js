import { useMediaQuery } from 'react-responsive';

const TABLET_MIN_WIDTH = 834;
const DESKTOP_MIN_WIDTH = 1280;

export const useResponsive = () => {
    const isMobile = useMediaQuery({
        query: `(max-width:${TABLET_MIN_WIDTH - 1}px)`,
    });
    const isTablet = useMediaQuery({
        query: `(min-width:${TABLET_MIN_WIDTH}px) and (max-width:${
            DESKTOP_MIN_WIDTH - 1
        }px)`,
    });
    const isDesktop = useMediaQuery({
        query: `(min-width:${DESKTOP_MIN_WIDTH}px)`,
    });

    return {
        isMobile,
        isTablet,
        isDesktop,
    };
};

export const Mobile = ({ children }) => {
    const { isMobile } = useResponsive();
    if (isMobile) {
        return children;
    }
    return null;
};

export const Tablet = ({ children }) => {
    const { isTablet } = useResponsive();
    if (isTablet) {
        return children;
    }
    return null;
};

export const Desktop = ({ children }) => {
    const { isDesktop } = useResponsive();
    if (isDesktop) {
        return children;
    }
    return null;
};
