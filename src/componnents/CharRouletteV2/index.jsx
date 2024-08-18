import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
export default function CharRouletteV2({ images, imageIndex, setImageIndex }) {
    const [isInitialRender, setIsInitialRender] = useState(true)
    useEffect(() => {


        setIsInitialRender(false)
    }, [])

    const previousImage = () => {
        setImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    }

    const nextImage = () => {
        setImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    }

    const getImageClass = (imageIndex, index) => {
        const { button, beforePreviousImage, afterNextImage, currentImage, previousImage, nextImage, offGridImg } = styles
        const length = images.length

        const isCurrent = index === imageIndex
        const isBeforePrevious = index === (imageIndex - 2 + length) % length
        const isPrevious = index === (imageIndex - 1 + length) % length
        const isNext = index === (imageIndex + 1) % length
        const isAfterNext = index === (imageIndex + 2) % length

        if (isCurrent) return `${button} ${currentImage}`
        if (isBeforePrevious) return `${button} ${beforePreviousImage}`
        if (isPrevious) return `${button} ${previousImage}`
        if (isNext) return `${button} ${nextImage}`
        if (isAfterNext) return `${button} ${afterNextImage}`
        return offGridImg

    }

    const handleClick = (index) => {

        if (index === (imageIndex - 1 + images.length) % images.length) {
            previousImage();
        } else if (index === (imageIndex + 1) % images.length) {
            nextImage();
        }
    }

    return (
        <div className={styles.rouletteContainer}>
            <div className={styles.imageWrapper}>
                {images.map((image, index) => {

                    return (
                        <button key={index}
                            className={`${getImageClass(imageIndex, index)}${isInitialRender ? styles.noTransition : ''}`}
                            type='button'
                            onClick={() => handleClick(index)}
                        >
                            <img
                                src={image}
                                alt={`Character ${index}`}
                                className={styles.image}
                            />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
