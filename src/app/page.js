'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';
import { AiOutlineSend } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import data from '@/utils/data';
import Card from '@/components/Card';
import Link from 'next/link';

export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.cardsDiv}>
        {data.map((value, index) => {
          return (
            <div className={styles.cardDiv}>
              <Link href={'/chat'} className={styles.link}>
                <Card name={value.name} description={value.description} />
              </Link>
            </div>
          )
        })}
      </div>
    </main>
  )
}
