import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
import { api } from '../services';
import arrow from '../assets/leftArrow.png';
import { colors, text, theme } from '../styles';
import {useNavigation} from '@react-navigation/native'

const ProductDetails: React.FC = ({ route: { params: { id } } }) => {

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [product, setProduct] = useState({
        id: null,
        name: null,
        description: null,
        price: null,
        imgUrl: null,
        date: null,
        categories: null
    })
    

    const loadingProductData = async () => {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        setLoading(false);
    }

    useEffect(() => {
        loadingProductData()
    }, []);

    return (
        <View style={theme.detailsContainer}>
            {
                loading ? (<ActivityIndicator size="large" color={colors.primary}/>) :
                    (
                        <View style={theme.detailsCard}>
                            <TouchableOpacity style={theme.goBackContainer} onPress={() => navigation.goBack()}>
                                <Image source={arrow} />
                                <Text style={text.goBackText}>Voltar</Text>
                            </TouchableOpacity>
                            <View style={theme.productImageContainer}>
                                <Image source={{ uri: product.imgUrl }} style={theme.productImage} />
                            </View>
                            <Text style={text.productDetailsName}>{product.name}</Text>
                            <View style={theme.priceContainer}>
                                <Text style={text.currency}>R$</Text>
                                <Text style={text.productPrice}>{product.price}</Text>
                            </View>
                            <ScrollView style={theme.scrolltextContainer}>
                                <Text style={text.productDescription}>{product.description}</Text>
                            </ScrollView>
                        </View>
                    )
            }
        </View>
    );
}

export default ProductDetails;