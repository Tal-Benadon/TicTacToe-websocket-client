import React, { useState } from 'react'
import styles from './style.module.scss'
export default function CharRoulette() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const images = ["person_01.png",
        "person_02.png",
        "person_03.png",
        "person_04.png",
        "person_05.png",
        "person_06.png",
        "person_07.png",
        "person_08.png",
        "person_09.png",
        "default_man.png",
        "default_woman.png"
    ]

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
