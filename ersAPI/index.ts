import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './src/routers/userrouter';
import { sessionMiddleware } from './src/middleware/sessionmiddleware';
import { authRouter } from './src/routers/authrouter';
import { reimbursementRouter } from './src/routers/reimbursementrouter';

// specify the port will run on
const port = process.env.PORT || 8012;
const app = express();

/**
 * Loggin middleware
 * This callback will be invoked anytime a request is made
 * regardless of url or http method
 */
app.use((req, res, next) => {
    console.log(`request made with url: ${req.url} and method ${req.method}`);
    next(); // pass request on to search for the next piece of middleware
});

// set up body parser to convert json body to object stored on req.body
app.use(bodyParser.json());

/**
 * Session middleware to give us access to req.session for session data
 */
app.use(sessionMiddleware);

/*******************************************
 * Register Routers
 ******************************************/
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter); // requests sent here from Postman
app.use(authRouter);

app.listen(port, () => {
    console.log('app started on port: ' + port);
});