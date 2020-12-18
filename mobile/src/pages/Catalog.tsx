import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { ProductCard, SearchInput } from '../components';
import { colors, theme } from '../styles';
import { api } from '../services';

const Catalog: React.FC = () => {

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const abc = {
        url : "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/3-big.jpg"
    }

    async function fillProduct() {
        setLoading(true);
        const res = await api.get('/products?page=0&linesPerPage=12&direction=ASC&orderBy=name');
        setProducts(res.data.content);
        setLoading(false);
    }

    useEffect(() => {
        fillProduct();
    }, []);

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
            { loading ? ( <ActivityIndicator size="large" color={colors.primary}/>) :
                (data.map(product => <ProductCard {...product} key={product.id} /> ))}
        </ScrollView>
    )
}

export default Catalog;