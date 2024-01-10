import React from 'react'
import styles from '@/styles/card.module.css'

const Card = (props) => {
    return (
        <div className={styles.mainMainDiv}>
            <div className={styles.mainDiv}>
                <h2 className={styles.title}>{props.name}</h2>
                <p className={styles.desc}>{props.description}</p>
            </div>
        </div>
    )
}

export default Card