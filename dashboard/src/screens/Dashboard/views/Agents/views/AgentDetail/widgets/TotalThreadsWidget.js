import React from 'react';
import { Text } from '@comba.se/ui';

// Components //
import InfoWidget from 'shared/InfoWidget';

const ThreadCount = () => {
    return (
        <Text size={48} weight="800">
            12
        </Text>
    );
};

const TotalThreadsWidget = () => {
    return <InfoWidget widget={ThreadCount} label="Total Active Threads" />;
};

export default TotalThreadsWidget;
