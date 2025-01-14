import React, { useState } from 'react';
import '../styles/filter.css';

function Filter() {
    const [activeFilter, setActiveFilter] = useState('Naruto'); // Track the active filter
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setScrollLeft(e.currentTarget.scrollLeft);
        e.currentTarget.style.cursor = 'grabbing'; // Cursor when dragging
    };

    const handleMouseLeave = (e) => {
        setIsDragging(false);
        e.currentTarget.style.cursor = 'grab'; // Reset cursor when mouse leaves
    };

    const handleMouseUp = (e) => {
        setIsDragging(false);
        e.currentTarget.style.cursor = 'grab'; // Reset cursor after dragging
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return; // Only drag when the user is holding the mouse down
        e.preventDefault(); // Prevent default mouse actions like text selection
        const x = e.clientX;
        const walk = (x - startX) * 3; // Scroll speed (multiplied for a faster scroll)
        e.currentTarget.scrollLeft = scrollLeft - walk; // Adjust scroll position based on mouse movement
    };

    const handleFilterClick = (filter) => {
        setActiveFilter(filter); // Update the active filter
    };

    return (
        <div
            className="Filter-parent"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {[
                'Naruto',
                'One Piece',
                'Dragon Ball',
                'Attack on Titan',
                'My Hero Academia',
                'Demon Slayer',
                'Fullmetal Alchemist',
                'Tokyo Ghoul',
                'Death Note',
                'Bleach',
            ].map((filter) => (
                <div
                    key={filter}
                    className={`Filter-item ${activeFilter === filter ? 'Filter-active' : 'Filter-unactive'}`}
                    onClick={() => handleFilterClick(filter)}
                >
                    <p>{filter}</p>
                </div>
            ))}
        </div>
    );
}

export default Filter;
