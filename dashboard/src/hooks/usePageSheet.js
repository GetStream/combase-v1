import { useEffect, useState } from 'react';

export default data => {
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [results, setResults] = useState(data);

    useEffect(() => {
        setResults(
            data.filter(({ title, type }) => {
                if (activeTab !== 'All') {
                    return (
                        title.toLowerCase().includes(query.toLowerCase()) &&
                        type === activeTab
                    );
                } else {
                    return title.toLowerCase().includes(query.toLowerCase());
                }
            })
        );
    }, [data, query, activeTab]);

    return [results, setQuery, activeTab, setActiveTab];
};
