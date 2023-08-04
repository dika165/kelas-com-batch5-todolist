/*
    1. buat endpoint untuk update
    2. buat endpoint untuk delete
    3. modifikasi endpoint create, ketika berhasil tampilkan data yang di insert
*/
import express from 'express';
import * as UserService from './services/user.js';
import * as Response from './utils/response.js';

const app = express();
const port = 8080;
const host = "localhost";

app.use(express.json());

app.get('/users', UserService.getUser);
app.post('/users', UserService.addUser);
app.get('/users/:id', UserService.getUserDetail);
app.post('/login', UserService.login);

app.use((err, req, res, next) => {
    const msg = "internal server error";
    console.log(err.message);

    Response.respError(res, msg, 500);
});

app.listen(port, host, () => {
    console.log(`server REST API berjalan di http://${host}:${port}`);
})

