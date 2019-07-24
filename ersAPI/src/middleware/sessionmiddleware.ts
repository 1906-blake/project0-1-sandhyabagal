import session from 'express-session';

const sessionConfiguration = {
    secret: 'magic',
    cookie: { secure: false },
    resave: false
};

export const sessionMiddleware = session(sessionConfiguration);