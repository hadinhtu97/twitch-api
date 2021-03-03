import twitch from '../../lib/twitch'

export default async (req, res) => {
    if (req.method == 'GET') {
        if (req.query.user == undefined) {
            res.json({ error: 'Required "user" parameter!' })
        } else {
            try {
                let data = await twitch(req.query.user);
                data == null ? res.json({ error: 'Cannot find user: ' + req.query.user }) : res.json(data)
            } catch (err) {
                res.json({ error: 'Some errors happened. Try again later!' })
            }
        }
    } else {
        res.status(404).end();
    }
}