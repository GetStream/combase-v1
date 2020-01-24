import { useEffect, useState } from 'react';

export default (data, searchKey, tabKey) => {
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [results, setResults] = useState(data);

    useEffect(() => {
        setResults(
            data.filter(item => {
                if (activeTab !== 'All') {
                    return (
                        item[searchKey]
                            .toLowerCase()
                            .includes(query.trim().toLowerCase()) &&
                        item[tabKey] === activeTab
                    );
                } else {
                    return item[searchKey]
                        .toLowerCase()
                        .includes(query.trim().toLowerCase());
                }
            })
        );
    }, [data, query, activeTab, searchKey, tabKey]);

    return [results, setQuery, activeTab, setActiveTab];
};
