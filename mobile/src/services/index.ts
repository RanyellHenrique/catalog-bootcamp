import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const api = axios.create({
    baseURL: 'https://ranyell-dscatalog.herokuapp.com'
});


export const TOKEN = 'Basic ZHNjYXRhbG9nOmRzY2F0YWxvZzEyMw==';

export const getProducts = () => {
    const res = api.get('/products?page=0&direction=DESC&orderBy=id');
    return res;
}

export const getCategories = () => {
    const res = api.get('/categories?direction=ASC&orderBy=name');
    return res;
}

export const createProduct = async (data: object) => {
    const authToken = await userToken();
    const res = api.post('/products', data, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    })
    return res;
}

export const deleteProduct = async (id: number) => {
    const authToken = await userToken();
    const res = api.delete(`/products/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });
    return res;
}

export const userToken = async () => {
    const token = await AsyncStorage.getItem("@token");
    return token;
}

export const uploadImage = async (image: string) => {
    if(!image) return;
    const authToken = await userToken();
    console.warn(image)
    let data = new FormData();
    data.append("file", {
        uri: image,
        name: image
    });

    const res = await api.post('/products/image', data, {
        headers:{
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
            Accept: 'application/json',
        },
    });

    return res;
}