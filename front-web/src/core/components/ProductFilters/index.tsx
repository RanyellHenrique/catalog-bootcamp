import React, { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from 'core/assets/images/search-icon.svg';
import './styles.scss';
import Select from 'react-select';
import { makeRequest } from 'core/utils/request';
import { Category } from 'core/types/Products';

export type FilterForm = {
    name?: string;
    categoryId?: number;
}

type Props = {
    onSearch: (filter: FilterForm) => void;
}

const ProductFilters = ({ onSearch }: Props) => {

    const [categories, setCategories] = useState<Category[]>();
    const [isLoadingCategories, SetIsLoadingCategories] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>();

    useEffect(() => {
        SetIsLoadingCategories(true);
        makeRequest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => SetIsLoadingCategories(false))
    }, []);

    const handleChangeName = (name: string) => {
        setName(name);
        onSearch({ name, categoryId: category?.id });
    }

    const handleChangeCategory = (category: Category) => {
        setCategory(category);
        onSearch({ name, categoryId: category?.id });
    }

    const clearFilters = () => {
        setCategory(undefined);
        setName('');
        onSearch({ name: '', categoryId: undefined })
    }

    return (
        <div className="card-base product-filters-container">
            <div className="input-search">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar Produto"
                    value={name}
                    onChange={e => handleChangeName(e.target.value)}
                />
                <SearchIcon />
            </div>
            <Select
                as={Select}
                name="categories"
                key={`select-${category?.id}`}
                options={categories}
                value={category}
                isLoading={isLoadingCategories}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => String(option.id)}
                classNamePrefix="categories-select"
                className="filter-select-container"
                placeholder="Categorias"
                inputId="categories"
                data-testid="categories"
                onChange={value => handleChangeCategory(value as Category)}
            />
            <button
                className="btn btn-outline-secondary boder-radius-10"
                onClick={clearFilters}
            >
                LIMPAR FILTROS
            </button>
        </div>
    );
}

export default ProductFilters;