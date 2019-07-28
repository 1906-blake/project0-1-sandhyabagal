import express from 'express';
import * as UserDao from '../daos/sqluserdao';

export const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserDao.findByUsernameAndPassword(username, password);
    console.log(user);
    if (user) {
        req.session.user = user;
        res.json(user);
        res.end();
    } else {
        req.session.destroy(() => { });
        res.status(400);
        res.send('Invalid Credentials');
    }
    console.log(req.session.user);
});


authRouter.get('/check-session', (req, res) => {
    res.json(req.session);
});