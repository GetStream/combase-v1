import { useEffect, useState } from 'react';
import getNestedProperty from 'utils/getNestedProperty';

export default (data, searchKey, tabKey) => {
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [results, setResults] = useState(data);

    useEffect(() => {
        setResults(
            data.filter(item => {
                let searchTerm = '';
                if (typeof searchKey !== 'string') {
                    searchTerm = searchKey
                        .map(key => getNestedProperty(item, key))
                        .join(' ');
                } else {
                    searchTerm = getNestedProperty(item, searchKey);
                }

                if (activeTab !== 'All') {
                    return (
                        searchTerm
                            .toLowerCase()
                            .includes(query.trim().toLowerCase()) &&
                        getNestedProperty(item, tabKey) === activeTab
                    );
                } else {
                    if (typeof searchKey === 'string') {
                        return searchTerm
                            .toLowerCase()
                            .includes(query.trim().toLowerCase());
                    } else {
                        return searchTerm
                            .toLowerCase()
                            .includes(query.trim().toLowerCase());
                    }
                }
            })
        );
    }, [data, query, activeTab, searchKey, tabKey]);

    return [results, setQuery, activeTab, setActiveTab];
};
