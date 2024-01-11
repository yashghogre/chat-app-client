import React from 'react'
import { IoMdMenu } from "react-icons/io";
import styles from '@/styles/navbar.module.css'
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className={styles.mMDiv}>
            <div className={styles.mDiv}>
                <Link href={'/'}>
                    <h3 className={styles.title}>TalkBud</h3>
                </Link>
                <div className={styles.iconDiv}>
                    <IoMdMenu size={35} />
                </div>
            </div>
        </div>
    )
}

export default Navbar