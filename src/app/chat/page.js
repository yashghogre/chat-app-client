'use client'

import Image from 'next/image'
import styles from './../../styles/chat.module.css'
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from 'react';
import { AiOutlineSend } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
const socket = io('https://chat-app-server-dmth.onrender.com', { withCredentials: true });

export default function Home() {

  const [msg, setMsg] = useState('')
  const [inMsg, setInMsg] = useState([])
  const [position, setPosition] = useState('')
  const lastMsg = useRef(null)

  useEffect(() => {
    // socket = io('http://localhost:9000', { withCredentials: true });
    // socket.on('connect', () => {
    //  console.log('User Connected')
    // })
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on('msg', (msg) => {
      // console.log('Message from server:', msg);
      setInMsg((prev) => [...prev, { msg: msg.msg, pos: socket.id === msg.id ? 'right' : 'left', fD: socket.id === msg.id ? 'row-reverse' : 'row' }])
      if (msg.id === socket.id) {
        setPosition('right')
      }
      else { setPosition('left') }
      // console.log(socket.id)
    });
    // console.log(position)
    // console.log(inMsg)
  }, [])

  useEffect(() => {
    lastMsg.current?.scrollIntoView();
  }, [inMsg])

  const send = (e) => {
    // e.preventDefault();
    // console.log(msg)
    socket.emit('msg', { msg: msg, id: socket.id })
    setMsg('')
  }

  return (
    <main className={styles.main}>
      <div className={styles.msg}>
        {
          inMsg.map((value, key) => {
            return (
              <div key={key} className={styles.msgDiv} style={{ textAlign: `${value.pos}`, display: 'flex', flexDirection: `${value.fD}`, alignItems: 'center', gap: '10px' }}>
                <FaRegUserCircle size={25} />
                <p key={key} style={{ color: 'black', display: 'flex', gap: '1vw', alignItems: 'center', display: 'inline' }}>{value.msg}</p>
                <div ref={lastMsg} />
              </div>)
          })
        }
        {/* <p>{typeof(inmsg)}</p> */}

        <div className={styles.inputDiv}>
          <input type='textarea' value={msg} onChange={(e) => setMsg(e.target.value)} className={styles.input} placeholder='Type your Message' />
          {msg.length === 0 ?
            <button className={styles.btn}><AiOutlineSend color='lightGray' size={25} /></button> :
            <button  onClick={send} className={styles.btn}><AiOutlineSend size={25} /></button>
          }
        </div>
      </div>
    </main>
  )
}
