import fetch from 'node-fetch'

const api = `https://twitch-proxy.freecodecamp.rocks/twitch-api/`

const isUserValid = async (user) => {
    let res = await fetch(api + 'users/' + user)
    let data = await res.json()
    return !data.hasOwnProperty('error');
}

const getUserInfo = async (user) => {
    let res = await fetch(api + 'channels/' + user)
    let data = await res.json()
    return {
        name: data.display_name,
        channelURL: data.url,
        logoURL: data.logo,
        totalViews: data.views,
        followers: data.followers,
    }
}

const getUserStream = async (user) => {
    let res = await fetch(api + 'streams/' + user)
    let data = await res.json()
    if (data.stream == null) {
        return {
            stream: null
        }
    } else {
        return {
            stream: {
                game: data.stream.game,
                viewers: data.stream.viewers
            }
        }
    }
}

export default async (user) => {
    let valid = await isUserValid(user);
    if (valid) {
        let userInfo = await getUserInfo(user)
        let userStream = await getUserStream(user)
        return Object.assign({}, userInfo, userStream)
    } else {
        return null
    }
}