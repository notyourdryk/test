import { useEffect, useState } from 'react';

export default () => {
    const [version, setVersion] = useState<null | string>(null);
    const getVersion = async () => {
        const response = await fetch('http://localhost:3000/version');
        const version = await response.text();
        setVersion(version);
    }
    useEffect(() => {
        getVersion();
    }, []);

    return version;
}
