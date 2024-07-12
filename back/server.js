import express from "express";
import session from 'express-session';
import routes from "./src/routes/index.js";
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from "./src/model/index.js";
import SequelizeStore from 'connect-session-sequelize';

dotenv.config();

const server = express();
const SequelizeStoreConstr = SequelizeStore(session.Store);
const port = process.env.PORT;


server.use(cors({
    origin: process.env.REACT_URL,
    credentials: true
}
));
server.use(session({
    name: "test",
    secret: "simple",
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStoreConstr({
        db: sequelize,
        expiration: 24 * 60 * 60 * 1000
    }),
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // Durée de validité du cookie en millisecondes (1 jour ici)
    }
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
        return sequelize.sync(); // Synchroniser Sequelize avec la base de données
    })
    .then(() =>
    {
        console.log('Database synchronization completed.');
        server.listen(port, () =>
        {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch(err =>
    {
        console.error('Unable to connect to the database:', err);
    });

