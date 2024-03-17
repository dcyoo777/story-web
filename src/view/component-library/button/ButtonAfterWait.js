import React, { useCallback, useState } from 'react';
import Button from './Button';

function ButtonAfterWait({ onClick, disabled, activate = false, ...props }) {
    const [isActive, setIsActive] = useState(true);

    const onClickButton = useCallback(async () => {
        if (!isActive) {
            return;
        }
        setIsActive(false);
        await onClick();
    }, [onClick, isActive]);

    return (
        <Button
            disabled={disabled || !isActive}
            onClick={onClickButton}
            {...props}
        />
    );
}

export default ButtonAfterWait;
