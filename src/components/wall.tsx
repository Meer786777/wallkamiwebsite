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
}

function Wall({ activeFilter }: WallProps) {
    const totalImages = 50;
    const initialBatchSize = 30;
    const loadMoreBatchSize = 10;
    const maxVisibleImages = 30;
    const maxFailedAttempts = 3;

    const [loading, setLoading] = useState(true);
    const [showImages, setShowImages] = useState(false);
    const [images, setImages] = useState<Image[]>([]);
    const [imagesToLoad, setImagesToLoad] = useState(initialBatchSize);
    const [endReached, setEndReached] = useState(false);

    // Shuffle function
    const shuffleArray = (array: Image[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    useEffect(() => {
        const newImages: Image[] = [];
        const folder = activeFilter === 'Featured' ? 'Featured' : 'Goku';

        // Modify filename generation logic based on filter
        for (let i = 0; i < imagesToLoad; i++) {
            const filename = activeFilter === 'Featured'
                ? `Featured(${i + 1}).jpeg`  // For Featured images
                : `Goku(${i + 1}).jpeg`;  // For Goku images
            const title = titles[filename] || null; // If no title, set it to null

            newImages.push({
                src: `https://raw.githubusercontent.com/Meer786777/wallkamiFolder1/main/${folder}/${filename}`,
                alt: `${folder} ${i + 1}`,
                attempts: 0,
                loaded: false,
                title: title, // Attach the title (null if not available)
            });
        }

        if (activeFilter === 'Featured') {
            shuffleArray(newImages);
        }

        setImages((prevImages) => {
            const updatedImages = [...prevImages, ...newImages];
            if (updatedImages.length > maxVisibleImages) {
                return updatedImages.slice(updatedImages.length - maxVisibleImages);
            }
            return updatedImages;
        });

    }, [activeFilter, imagesToLoad]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setShowImages(true);
        }, 7000);

        return () => clearTimeout(timer);
    }, []);

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

    return (
        <>
            <div className="Wall-parent">
                {images.map((image, index) => (
                    <div key={index} className="img-parent">
                        {loading && !image.loaded && <div className="loader">Loading...</div>}
                        {showImages && (
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
                                {/* Render the title only if it exists */}
                                {image.title && (
                                    <div className="title-parent">
                                        <p>{image.title}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {!endReached && imagesToLoad < totalImages && (
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
