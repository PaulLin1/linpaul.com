"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGE_COUNT = 117;
const SLOTS = 15;
const IMAGE_LIFESPAN = 4000;
const ADD_INTERVAL = 500;

interface CollageImage {
    src: string;
    width: number;
    height: number;
    key: string;
    n: number;
    top: number;
    left: number;
    addedAt: number; // When this image was added
    expiresAt: number; // When this image should be removed
}

// helper functions
function range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getRandomUniqueNumbers(count: number, max: number): number[] {
    const numbers = new Set<number>();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * max) + 1);
    }
    return Array.from(numbers);
}

function randomSize() {
    const widths = [200, 250, 300, 350];
    const heights = [150, 180, 220, 270];
    return {
        width: widths[Math.floor(Math.random() * widths.length)],
        height: heights[Math.floor(Math.random() * heights.length)],
    };
}

function randomPosition(width: number, height: number) {
    return {
        top: Math.random() * (window.innerHeight - height),
        left: Math.random() * (window.innerWidth - width),
    };
}

export default function CollageBackground() {
    const [images, setImages] = useState<CollageImage[]>([]);

    // Initialize collage
    useEffect(() => {
        const initialNumbers = getRandomUniqueNumbers(SLOTS, IMAGE_COUNT);
        const now = Date.now();

        const initialImages = initialNumbers.map((n, index) => {
            const size = randomSize();
            const pos = randomPosition(size.width, size.height);
            const addedAt = now + index * 200; // Stagger initial additions slightly

            return {
                src: `/imgs/${n}.jpg`,
                width: size.width,
                height: size.height,
                key: `${n}-${addedAt}`,
                n,
                addedAt,
                expiresAt: addedAt + IMAGE_LIFESPAN,
                ...pos,
            };
        });

        initialImages.forEach((img) => (new Image().src = img.src));
        setImages(initialImages);
    }, []);

    // Add new images periodically
    useEffect(() => {
        const addInterval = setInterval(() => {
            setImages((currentImages) => {
                // Only add if we have space
                if (currentImages.length >= SLOTS) return currentImages;

                const now = Date.now();
                const currentNs = new Set(currentImages.map((img) => img.n));

                // Find available image number
                const availableNumbers = range(1, IMAGE_COUNT).filter(
                    (n) => !currentNs.has(n),
                );
                if (availableNumbers.length === 0) return currentImages;

                const newN =
                    availableNumbers[
                        Math.floor(Math.random() * availableNumbers.length)
                    ];
                const size = randomSize();
                const pos = randomPosition(size.width, size.height);

                const newImage: CollageImage = {
                    src: `/backgroundImages/${newN}.jpg`,
                    width: size.width,
                    height: size.height,
                    key: `${newN}-${now}`,
                    n: newN,
                    addedAt: now,
                    expiresAt: now + IMAGE_LIFESPAN,
                    ...pos,
                };

                // Preload the new image
                new Image().src = newImage.src;

                return [...currentImages, newImage];
            });
        }, ADD_INTERVAL);

        return () => clearInterval(addInterval);
    }, []);

    // Remove expired images
    useEffect(() => {
        const cleanupInterval = setInterval(() => {
            setImages((currentImages) => {
                const now = Date.now();
                return currentImages.filter((img) => img.expiresAt > now);
            });
        }, 100); // Check every 100ms for expired images

        return () => clearInterval(cleanupInterval);
    }, []);

    return (
        <div
            id="collage-background"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                zIndex: -1,
            }}
        >
            <AnimatePresence>
                {images.map((img) => (
                    <motion.div
                        key={img.key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        style={{
                            position: "absolute",
                            top: img.top,
                            left: img.left,
                        }}
                    >
                        <img
                            src={img.src}
                            width={img.width}
                            height={img.height}
                            loading="lazy"
                            style={{
                                objectFit: "cover",
                                opacity: 0.8,
                            }}
                            onError={(e) => {
                                const target = e.currentTarget;
                                const blank = document.createElement("div");
                                blank.style.width = `${img.width}px`;
                                blank.style.height = `${img.height}px`;
                                blank.style.backgroundColor = "transparent";
                                target.replaceWith(blank);
                            }}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
