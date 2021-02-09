import Pagination from 'core/components/Pagination';
import ProductFilters from 'core/components/ProductFilters';
import { Category, ProductsResponse } from 'core/types/Products';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';
import CardLoader from '../Loaders/ProductCardLoades';


const List = () => {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>();
    const history = useHistory();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id',
            name: name,
            categoryId: category?.id
        }
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => setIsLoading(false));
    }, [activePage, name, category])

    useEffect(() => {
        getProducts();
    }, [getProducts])

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm("Deseja realmente excluir este produto?");

        if (confirm) {
            makePrivateRequest({ url: `/products/${productId}`, method: 'DELETE' })
                .then(() => {
                    toast.info('Produto removido com sucesso!');
                    getProducts();
                })
                .catch(() => {
                    toast.error('Erro ao remover produto!')
                });
        }
    }

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
        <div className="admin-products-list">
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                    ADICIONAR
            </button>
                <ProductFilters
                    name={name}
                    handleChangeCategory={handleChangeCategory}
                    handleChangeName={handleChangeName}
                    clearFilters={clearFilters}
                    category={category}
                />
            </div>
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Card
                            product={product}
                            key={product.id}
                            onRemove={onRemove}
                        />
                    ))
                )}
                {productsResponse &&
                    <Pagination
                        totalPages={productsResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />}
            </div>
        </div>
    );
}


export default List;