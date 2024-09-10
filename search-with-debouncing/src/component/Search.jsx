import React, { useState, useEffect, useCallback } from 'react';

// Simulated API call to fetch results
const fetchSearchResults = (query) => {
    // Simulated data source
    const allResults = [
        "apple",
        "banana",
        "apricot",
        "application",
        "cherry",
        "grape",
        "mango",
        "peach",
        "pear"
    ];

    return new Promise((resolve) => {
        setTimeout(() => {
            const filteredResults = allResults.filter(item => item.toLowerCase().includes(query.toLowerCase()));
            resolve(filteredResults);
        }, 500); // Simulate a delay of 500ms
    });
};

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to handle the search
    const handleSearch = useCallback(async (query) => {
        if (query) {
            setLoading(true);
            const results = await fetchSearchResults(query);
            setResults(results);
            setLoading(false);
        } else {
            setResults([]);
        }
    }, []);

    // Debounce function to minimize the number of API calls
    const debounce = (func, delay) => {
        let debounceTimer;
        return function (...args) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Wrapped search function with debounce
    const debouncedSearch = useCallback(debounce(handleSearch, 300), [handleSearch]);

    // Effect to call the debounced search function
    useEffect(() => {
        debouncedSearch(query);
    }, [query, debouncedSearch]);

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            {loading && <p>Loading...</p>}
            <div id="results">
                {results.map((result, index) => (
                    <div key={index}>{result}</div>
                ))}
            </div>
        </div>
    );
}

export default Search;
