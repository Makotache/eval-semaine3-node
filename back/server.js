import express from "express";
import session from 'express-session';
import routes from "./src/routes/index.js";
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from "./src/model/index.js";
dotenv.config();

const server = express();
const port = process.env.PORT;


server.use(cors({
    origin: process.env.REACT_URL,
    credentials: true
}
));
server.use(session({
    name: "test",
    secret: "simple",
    resave: false,
    saveUninitialized: true,
}));

server.use(function (req, res, next)
{
    res.locals.message = req.session.message
    req.session.message = null
    next();
});
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(routes);


sequelize.authenticate()
    .then(() =>
    {
        console.log('Database connected successfully.');
        server.listen(port, () =>
        {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch(err =>
    {
        console.error('Unable to connect to the database:', err);
    });

