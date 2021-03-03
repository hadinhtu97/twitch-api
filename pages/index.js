import styles from '../styles/Home.module.css'
import Head from 'next/head'
import fetch from 'node-fetch'
import React, { useState, useEffect } from 'react'

const Home = () => {

    const [streamers, setStreamers] = useState([])

    const getUserInfo = async (user) => {
        let res = await fetch('/api/twitch?user=' + user)
        return await res.json()
    }

    useEffect(() => {
        let users = ["OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
        users.forEach(user => {
            getUserInfo(user).then(userInfo => {
                setStreamers(streamers => [...streamers, userInfo])
            })
        })
    }, [])

    return (
        <>
            <Head>
                <title>Twitch API</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.title}>Twitch Streamers</div>
                <div className={styles.contents}>
                    {
                        streamers.map((streamer, i) =>
                            <a key={i} className={styles.content} href={streamer.channelURL} target="_blank" title='Twitch channel'>
                                <div className={styles.info}>
                                    <img className={styles.logo} src={streamer.logoURL} />
                                    <div className={styles.name}>{streamer.name}</div>
                                </div>
                                <div className={styles.stream}>
                                    {streamer.stream == null ? 'Offline' : streamer.stream.game + ' (' + streamer.stream.viewers + ' viewers' + ')'}
                                </div>
                                <div className={styles.moreInfo}>
                                    <div className={styles.followers}>{streamer.followers} followers</div>
                                    <div className={styles.totalViews}>{streamer.totalViews} views</div>
                                </div>
                            </a>
                        )
                    }
                </div>
            </main>
        </>
    )
}

export default Home