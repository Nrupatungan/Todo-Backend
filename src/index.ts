import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB';
import app from './app';

dotenv.config({
    path: '.env'
});

const port = process.env.PORT || 3000;

// Connect to database
connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.error("Server Error: ", err);
            throw err;
        })

        app.listen(port, () => {
            console.log(`⚙️  Server running on port: ${port}`);
        });
    })
    .catch((err) => {
        console.error("❌  Error connecting to database: ", err);
    });