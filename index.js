import express from 'express';
import cors from 'cors';
import dbConnect from './src/config/dbConnect.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(
    cors({
        origin: '*', // thay port client ở đây
    })
);

// connect db
dbConnect();

const PORT = process.env.PORT || 5555;

app.use('/', (req, res) => {
    res.send('server on...');
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});
