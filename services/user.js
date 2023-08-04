import * as UserRepository from '../repository/user.js';
import { respSuccess } from '../utils/response.js';

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
        const user = await UserRepository.createData(req.body.name, req.body.email, req.body.password);
        console.log(user);
        respSuccess(res, "berhasil menambahkan user", user, 201);
    } catch (error) {
        next(error)
    }
}
