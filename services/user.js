import * as UserRepository from '../repository/user.js';
import { respError, respSuccess } from '../utils/response.js';
import bcypt, { hash } from 'bcrypt';

export const getUser = async (req, res, next) =>{
    try {
        const [result] = await UserRepository.getAll();
        respSuccess(res, "success", result);
    } catch(error) {
        next(error);
    }
}

export const getUserDetail = async (req, res, next) => {
    try {
        const id = req.params.id;
        const [result] = await UserRepository.getById(id);
        respSuccess(res, "success", result[0]);
    } catch(error) {
        next(error);
    }
}

export const addUser = async (req, res, next) => {
    try {
        let hasedPass = '';
        const saltRound = 10;
        bcypt.hash(req.body.password, saltRound, async (err, hash) => {
            if (err) {
                console.log("error hashisng pass:", err.message);
            }
            console.log("value hashing",hash);
            const user = await UserRepository.createData(req.body.name, req.body.email, hash);
            console.log(user[0]);
            respSuccess(res, "berhasil menambahkan user", user[0], 201);
        });
    
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const [user] = await UserRepository.getUserByEmail(req.body.email);
        if (user.length > 0) {
            let password = req.body.password;
            let hasedPass = user[0].password;
            bcypt.compare(password, hasedPass, (err, result) => {
                if(result) {
                    respSuccess(res, "login berhasil", user[0])
                } else {
                    respError(res, "email atau password salah",401)
                }
            });
        }
    } catch(err) {
        next(err)
    }
}
