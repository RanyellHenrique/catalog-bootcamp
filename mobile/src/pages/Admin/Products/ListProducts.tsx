import React, { useEffect, useState } from 'react';
import { Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors, admin, text } from '../../../styles';
import { SearchInput, ProductCard } from '../../../components';
import { deleteProduct, getProducts } from '../../../services';

interface ProductProps {
    setScreen: Function;
}


const Products: React.FC<ProductProps> = (props) => {

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setScreen } = props;

    const abc = {
        url: "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/3-big.jpg"
    }

    async function fillProduct() {
        setLoading(true);
        const res = await getProducts();
        setProducts(res.data.content);
        setLoading(false);
    }

    const handleDelete = async (id: number) => {
        setLoading(true);
        const res = await deleteProduct(id);
        fillProduct();
    }

    useEffect(() => {
        fillProduct();
    }, []);

    const data = search.length > 0
        ? products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
        : products;

    return (
        <ScrollView contentContainerStyle={admin.container}>
            <TouchableOpacity style={admin.addButton} onPress={() => setScreen('newProduct')}>
                <Text style={text.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
            <SearchInput
                search={search}
                setSearch={setSearch}
                placeholder="Nome do produto"
            />
            { loading ? (<ActivityIndicator size="large" color={colors.primary} />) :
                (data.map(product => {
                    const {id} = product;
                    return (
                        <ProductCard
                            {...product}
                            key={id}
                            role="admin"
                            handleDelete={handleDelete}
                        />
                    )
                }))}
        </ScrollView>
    );
}


export default Products;