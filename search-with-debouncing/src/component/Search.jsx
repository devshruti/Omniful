import React, { useState, useEffect, useCallback } from 'react';

// Simulated function to fetch search results
const simulateFetchResults = (searchTerm) => {
    // Sample data for demonstration
    const data = [
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
            // Filter data to include items that match the search term
            const filteredItems = data.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
            resolve(filteredItems);
        }, 500); // Simulate network delay
    });
};

function SearchComponent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Function to perform the search
    const search = useCallback(async (term) => {
        if (term) {
            setIsLoading(true);
            const results = await simulateFetchResults(term);
            setFilteredItems(results);
            setIsLoading(false);
        } else {
            setFilteredItems([]);
        }
    }, []);

    // Debounce utility to limit the frequency of API calls
    const debounceFunction = (fn, wait) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), wait);
        };
    };

    // Create a debounced version of the search function
    const debouncedSearch = useCallback(debounceFunction(search, 300), [search]);

    // Trigger the debounced search whenever the search term changes
    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search..."
            />
            {isLoading && <p>Loading results...</p>}
            <div>
                {filteredItems.map((item, idx) => (
                    <div key={idx}>{item}</div>
                ))}
            </div>
        </div>
    );
}

export default SearchComponent;
