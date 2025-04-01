import React from 'react';
import useVersion from './useVersion';

export default () => {
    const version = useVersion();
    return <>
        {
            !version
                ? 'loading'
                : version
        }
    </>
}
