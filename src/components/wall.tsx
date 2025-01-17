import React, { useState, useEffect } from 'react';
import '../styles/wall.css';
import titles from '../assets/titles.tsx'; // Import the titles object

interface Image {
    src: string;
    alt: string;
    attempts: number;
    loaded: boolean;
    title: string | null; // Title can be string or null
}

interface WallProps {
    activeFilter: string;
    searchQuery: string; // Added prop for search query
}

function Wall({ activeFilter, searchQuery }: WallProps) {
    const filterImageCounts = {
        Featured: 50,
        Goku: 60,
        Minimalist: 72,
        'Aesthetic Anime Girl': 46,
    };

    const initialBatchSize = 30;
    const loadMoreBatchSize = 10;
    const maxFailedAttempts = 3;

    const totalImages = filterImageCounts[activeFilter] || 0;

    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<Image[]>([]);
    const [imagesToLoad, setImagesToLoad] = useState(initialBatchSize);
    const [endReached, setEndReached] = useState(false);

    const shuffleArray = (array: Image[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    useEffect(() => {
        setLoading(true);
        setImages([]);
        setImagesToLoad(initialBatchSize);
        setEndReached(false);

        const newImages: Image[] = [];
        const folder =
            activeFilter === 'Featured'
                ? 'Featured'
                : activeFilter === 'Goku'
                ? 'Goku'
                : activeFilter === 'Minimalist'
                ? 'minimalist'
                : activeFilter === 'Aesthetic Anime Girl'
                ? 'aestheticanimegirl'
                : '';

        for (let i = 0; i < Math.min(imagesToLoad, totalImages); i++) {
            const filename =
                activeFilter === 'Aesthetic Anime Girl'
                    ? `animegirl(${i + 1}).png`
                    : activeFilter === 'Featured'
                    ? `Featured(${i + 1}).jpeg`
                    : activeFilter === 'Goku'
                    ? `Goku(${i + 1}).jpeg`
                    : activeFilter === 'Minimalist'
                    ? `minimalist(${i + 1}).png`
                    : '';

            const title = titles[filename] || null;

            newImages.push({
                src: `https://raw.githubusercontent.com/Meer786777/wallkamiFolder1/main/${folder}/${filename}`,
                alt: `${folder} ${i + 1}`,
                attempts: 0,
                loaded: false,
                title: title,
            });
        }

        shuffleArray(newImages);
        setImages(newImages);
        setTimeout(() => setLoading(false), 2000); // Adjusted loader timeout for smoother experience
    }, [activeFilter]);

    const handleImageLoad = (index: number) => {
        setImages((prevImages) =>
            prevImages.map((img, i) => (i === index ? { ...img, loaded: true } : img))
        );
    };

    const handleImageError = (index: number) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages[index].attempts += 1;

            if (updatedImages[index].attempts >= maxFailedAttempts) {
                updatedImages.splice(index, 1);
            }

            return updatedImages;
        });
    };

    const loadMoreImages = () => {
        if (imagesToLoad + loadMoreBatchSize <= totalImages) {
            setImagesToLoad((prev) => prev + loadMoreBatchSize);

            const newImages: Image[] = [];
            const folder =
                activeFilter === 'Featured'
                    ? 'Featured'
                    : activeFilter === 'Goku'
                    ? 'Goku'
                    : activeFilter === 'Minimalist'
                    ? 'minimalist'
                    : activeFilter === 'Aesthetic Anime Girl'
                    ? 'aestheticanimegirl'
                    : '';

            for (let i = imagesToLoad; i < Math.min(imagesToLoad + loadMoreBatchSize, totalImages); i++) {
                const filename =
                    activeFilter === 'Aesthetic Anime Girl'
                        ? `animegirl(${i + 1}).png`
                        : activeFilter === 'Featured'
                        ? `Featured(${i + 1}).jpeg`
                        : activeFilter === 'Goku'
                        ? `Goku(${i + 1}).jpeg`
                        : activeFilter === 'Minimalist'
                        ? `minimalist(${i + 1}).png`
                        : '';

                const title = titles[filename] || null;

                newImages.push({
                    src: `https://raw.githubusercontent.com/Meer786777/wallkamiFolder1/main/${folder}/${filename}`,
                    alt: `${folder} ${i + 1}`,
                    attempts: 0,
                    loaded: false,
                    title: title,
                });
            }

            setImages((prevImages) => [...prevImages, ...newImages]);
        } else {
            setEndReached(true);
        }
    };

    const handleDownload = (src: string) => {
        fetch(src)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = src.split('/').pop() || 'image.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error('Error downloading the image:', error);
            });
    };

    const filteredImages = images.filter((image) =>
        searchQuery.trim() === ''
            ? true
            : image.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="Wall-parent">
                {loading ? (
                    <div className="loader">Loading...</div>
                ) : (
                    filteredImages.map((image, index) => (
                        <div key={index} className="img-parent">
                            <div className="image-wrapper">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="wall-mbl"
                                    onLoad={() => handleImageLoad(index)}
                                    onError={() => handleImageError(index)}
                                />
                                <div className="download-btn" onClick={() => handleDownload(image.src)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                        <g clipPath="url(#clip0_40_3)">
                                            <path d="M11.5 16.7708L4.91145 10.1823L6.75625 8.27159L10.1823 11.6977V0.958313H12.8177V11.6977L16.2437 8.27159L18.0885 10.1823L11.5 16.7708ZM3.59375 22.0416C2.86901 22.0416 2.24858 21.7836 1.73248 21.2675C1.21638 20.7513 0.958328 20.131 0.958328 19.4062V15.4531H3.59375V19.4062H19.4062V15.4531H22.0417V19.4062C22.0417 20.131 21.7836 20.7513 21.2675 21.2675C20.7514 21.7836 20.131 22.0416 19.4062 22.0416H3.59375Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_40_3">
                                                <rect width="23" height="23" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                {image.title && (
                                    <div className="title-parent">
                                        <p>{image.title}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            {!endReached && filteredImages.length < totalImages && (
                <button onClick={loadMoreImages} className="load-more-btn">
                    <p>Load More</p>
                </button>
            )}
            {endReached && (
                <div className="load-more-btn">
                    <p>Sorry, you have reached the end. New images will be added soon.</p>
                </div>
            )}
        </>
    );
}

export default Wall;
