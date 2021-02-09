import React, { useCallback, useEffect, useState } from 'react';
import './styles.scss';
import ProductCard from './components/ProductsCard';
import { Link } from 'react-router-dom';
import { makeRequest } from 'core/utils/request';
import { Category, ProductsResponse } from 'core/types/Products';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';
import ProductFilters from 'core/components/ProductFilters';

const Catalog = () => {

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 12,
            name: name,
            categoryId: category?.id
        }
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => setIsLoading(false));
    }, [activePage, category, name]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleChangeName = (name: string) => {
        setName(name);
        setActivePage(0);
    }

    const handleChangeCategory = (category: Category) => {
        setCategory(category);
        setActivePage(0);
    }

    const clearFilters = () => {
        setCategory(undefined);
        setName('');
        setActivePage(0);
    }

    return (
        <div className="catalog-container">
            <div className="d-flex justify-content-between">
                <h1 className="catalog-title">
                    Catálogo de produtos
                </h1>
                <ProductFilters
                    name={name}
                    handleChangeCategory={handleChangeCategory}
                    handleChangeName={handleChangeName}
                    clearFilters={clearFilters}
                    category={category}
                />
            </div>
            <div className="catalog-products">
                {isLoading ? <ProductCardLoader /> :
                    productsResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <ProductCard product={product} />
                        </Link>
                    ))}
            </div>
            {productsResponse &&
                <Pagination
                    totalPages={productsResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                />}
        </div>
    );
}

export default Catalog;