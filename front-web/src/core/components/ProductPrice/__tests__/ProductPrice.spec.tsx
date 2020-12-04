import React from 'react';
import {render, screen} from '@testing-library/react';
import ProductPrice from '..';


test('should render ProductPrice', () => {
    render(
      <ProductPrice price={1200}/>  
    );

    const currentElement = screen.getByText('R$');
    const priceElement = screen.getByText('1,200.00');

    expect(currentElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
});

test('should render ProductPrice with price equals zero', () => {
    render(
      <ProductPrice price={0}/>  
    );

    const currentElement = screen.getByText('R$');
    const priceElement = screen.getByText('0.00');

    expect(currentElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
});

test('should render ProductPrice without thousad separator', () => {
    render(
      <ProductPrice price={110}/>  
    );

    const currentElement = screen.getByText('R$');
    const priceElement = screen.getByText('110.00');

    expect(currentElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
});