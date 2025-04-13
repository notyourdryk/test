import { Card, CardProps, Flex } from 'antd';
import { Link } from 'react-router-dom';
import React, { JSX, PropsWithChildren } from 'react';
import './PageCard.style.less';

type PageCardProps = PropsWithChildren & CardProps & {
    title: string;
    backUrl?: string;
};

export default function PageCard({ title, backUrl, children, ...cardProps }: PageCardProps): JSX.Element {
    return (
        <Flex justify="center">
            <Card
                title={title}
                classNames={{
                    header: 'station-card__header',
                    title: 'station-card__title',
                    extra: 'station-card__extra',
                }}
                className="station-card"
                extra={backUrl && (<Link to={backUrl}>Back</Link>)}
                {...cardProps}
            >
                {children}
            </Card>
        </Flex>
    );
}