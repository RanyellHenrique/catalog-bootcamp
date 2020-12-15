import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ProductCard, SearchInput } from '../components';
import productImg from '../assets/product.png';
import { theme } from '../styles';

const products = [
    {
        id: 1,
        imgUrl: productImg,
        name: "Smartphone",
        price: 2279.0
    },
    {
        id: 2,
        imgUrl: productImg,
        name: "Computador Desktop - Intel Core i7",
        price: 2279.0
    },
    {
        id: 3,
        imgUrl: productImg,
        name: "Computador Desktop - Intel Core i7",
        price: 2279.0
    },
    {
        id: 4,
        imgUrl: productImg,
        name: "Computador Desktop - Intel Core i7",
        price: 2279.0
    },
    {
        id: 5,
        imgUrl: productImg,
        name: "Computador Desktop - Intel Core i7",
        price: 2279.0
    }
]

const Catalog: React.FC = () => {

    const [search, setSearch] = useState("");

    const data = search.length > 0 
        ? products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())) 
        : products;

    return (
        <ScrollView contentContainerStyle={theme.scrollContainer}>
            <SearchInput
                placeholder="Nome do Produto"
                search={search}
                setSearch={setSearch}
            />
            {data.map(product => <ProductCard {...product} key={product.id} />)}
        </ScrollView>
    )
}

export default Catalog;