import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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