import React, { JSX } from 'react';
import { useParams } from 'react-router-dom';
import { $stations, updateTags } from '../stations';
import { Station } from '../types';
import { useStoreMap } from 'effector-react';
import { Tags } from '../components';
import { PageCard } from '../components';

export default function Station(): JSX.Element {
    const params = useParams();
    const station = useStoreMap({
        store: $stations,
        keys: [params.id],
        fn: (state, [stationId]) => state.find(({ id }) => id === stationId)
    });

    const handleTagsChange = (tags: Station['tags']) => {
        if (params.id)
            updateTags({ stationId: params.id, tags });
    };

    if (!station) return (<PageCard title="Not found" backUrl="/stations"/>);
    else return (
        <PageCard title={station.name} backUrl="/stations">
            <Tags tags={station.tags} onChange={handleTagsChange}/>
        </PageCard>
    );
}
