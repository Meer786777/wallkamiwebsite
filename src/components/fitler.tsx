import React, { useState } from 'react';
import '../styles/filter.css';

function Filter({ setActiveFilter }) {
    const [activeFilterState, setActiveFilterState] = useState('Featured'); // Track the active filter

    const handleFilterClick = (filter) => {
        setActiveFilterState(filter); // Update the active filter state
        setActiveFilter(filter); // Update the filter in Wall component
    };

    return (
        <div className="Filter-parent">
            {['Featured', 'Goku', 'Minimalist'].map((filter) => (  // Added 'Minimalist' here
                <div
                    key={filter}
                    className={`Filter-item ${activeFilterState === filter ? 'Filter-active' : 'Filter-unactive'}`}
                    onClick={() => handleFilterClick(filter)}
                >
                    <p>{filter}</p>
                </div>
            ))}
        </div>
    );
}

export default Filter;
