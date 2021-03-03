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
        let users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
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
            <main>
                <div>Twitch Streamers</div>
                {
                    streamers.map((streamer, i) =>
                        <div key={i}>
                            <p key={streamer.name}>{streamer.name}</p>
                            <p key={streamer.logoURL}>{streamer.logoURL}</p>
                            <p key={streamer.channelURL}>{streamer.channelURL}</p>
                            <p key={streamer.followers}>{streamer.followers}</p>
                            <p key={streamer.totalViews}>{streamer.totalViews}</p>
                            <p>{streamer.stream == null ? 'Offline' : 'Online, ' + streamer.stream.game + ' ,' + streamer.stream.viewers}</p>
                        </div>
                    )
                }
            </main>
        </>
    )
}

export default Home