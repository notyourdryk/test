import React from 'react';
import { Station as StationType } from '../types';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { useList } from 'effector-react';
import { $stations } from '../stations';
import { PageCard } from '../components';

export default function Stations() {
    const stations = useList($stations, Station);

    return (
        <PageCard
            title="Stations"
            actions={[<Link to="/version">Version</Link>]}
        >
            {!stations && 'Loading...'}
            {stations}
        </PageCard>
    );
}

type StationProps = StationType;

/** ts-ignore нужен тк тайпинг для react-router-dom не видит component
 * но в LinkProps такой пропс есть.
 */
function Station(props: StationProps) {
    return (<li>
        {/* @ts-ignore */}
        <Link to={`./${props.id}`} component={Typography.Link}>
            {props.name}
        </Link>
    </li>);
}