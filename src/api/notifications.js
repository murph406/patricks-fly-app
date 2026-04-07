import axios from 'axios'

// eslint-disable-next-line no-undef
const BASE_URL = process.env.EXPO_PUBLIC_API_URL + '/api'

export function sendNotification(title, body, pushToken) {
    const message = {
        to: pushToken,
        sound: 'default',
        title: title,
        body: body,
        data: { someData: 'Something could go here, but not sure' },
    }

    console.log(message)

    return axios.post('https://exp.host/--/api/v2/push/send', message, {
        headers: {
            'Accept': 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        }
    })
}

export function writePushToken(token) {
    return axios.post(BASE_URL + '/write-notification-token', {
        notificationToken: token
    })
}

