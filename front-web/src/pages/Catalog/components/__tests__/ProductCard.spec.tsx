import React from 'react';
import { render, screen } from "@testing-library/react";
import { Product } from 'core/types/Products';
import ProductCard from '../ProductsCard';

test('should render ProductCard', () => {

    const product = {
        name: 'computador',
        imgUrl: 'image.jpg',
        price: 40
    } as Product;

    render(
        <ProductCard product={product}/>
    );

    expect(screen.getByText('computador')).toBeInTheDocument();
    expect(screen.getByAltText('computador')).toBeInTheDocument();
    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('40.00')).toBeInTheDocument();
});