import React from 'react';

// Components //
import Text from 'shared/Text';
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
