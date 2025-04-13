import React from 'react';
import useVersion from '../hooks/useVersion';
import { PageCard } from '../components';

export default () => {
    const version = useVersion();

    return <PageCard title="Version" backUrl="/stations">
        {!version ? 'loading' : version }
    </PageCard>
}
