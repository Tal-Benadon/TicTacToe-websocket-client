import React, { useState } from 'react'
import styles from './style.module.scss'
export default function CharRoulette({ images, chosenIndex }) {

    const [currentIndex, setCurrentIndex] = useState(chosenIndex ? chosenIndex : 0)


    const previousImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    }

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    }

    return (
        <div className={styles.rouletteContainer}>
            <button onClick={previousImage} style={styles.arrowBtn} type='button'>{"<"}</button>
            <div className={styles.imageWrapper}>
                {images.length > 1 && (
                    <img
                        src={images[(currentIndex - 1 + images.length) % images.length]}
                        alt="Previous"
                        className={styles.sideImage}
                    />
                )}
                <img
                    src={images[currentIndex]}
                    alt="Current"
                    className={styles.currentImage}
                />
                {images.length > 1 && (
                    <img
                        src={images[(currentIndex + 1) % images.length]}
                        alt="Next"
                        className={styles.sideImage}
                    />
                )}
            </div>
            <button onClick={nextImage} type='button' className={styles.arrowBtn}>{">"}</button>
        </div>
    )
}
