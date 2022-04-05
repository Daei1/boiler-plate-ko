import axios from 'axios';
import {LOGIN_USER} from './types';
import {REGISTER_USER} from "../_actions/types";

export function loginUser(dataTosubmit){

    const request = axios.post('/api/users/login', dataTosubmit)
    .then(response =>response.data)
    return {
        type:LOGIN_USER,
        payload : request
    }
}


export function RegisterUser(dataTosubmit){

    const request = axios.post('/api/users/register', dataTosubmit)
    .then(response =>response.data)
    return {
        type:REGISTER_USER,
        payload : request
    }
}