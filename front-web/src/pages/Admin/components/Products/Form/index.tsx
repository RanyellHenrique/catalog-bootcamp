import React, { useEffect, useState } from 'react';
import './styles.scss';
import BaseForm from '../../BaseForm';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Category } from 'core/types/Products';

type FormState = {
    name: string;
    price: string;
    description: string;
    imgUrl: string;
    categories: Category[];
}

type ParamsType = {
    productId: string;
}

const Form = () => {

    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const [categories, setCategories] = useState<Category[]>();
    const [isLoadingCategories, SetIsLoadingCategories] = useState(false);
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'Editar um produto' : 'Cadastrar um produto';

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
                .then(response => {
                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('description', response.data.description);
                    setValue('imgUrl', response.data.imgUrl);
                    setValue('categories', response.data.categories);
                });
        }
    }, [productId, isEditing, setValue])

    useEffect(() => {
        SetIsLoadingCategories(true);
        makeRequest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => SetIsLoadingCategories(false))
    }, [])


    const onSubmit = (data: FormState) => {
        makePrivateRequest({
            url: isEditing ? `/products/${productId}` : '/products',
            method: isEditing ? 'PUT' : 'POST',
            data
        })
            .then(() => {
                toast.info('Produto Salvo com sucesso!');
                history.push('/admin/products');
            })
            .catch(() => {
                toast.error('Error ao salvar produto!')
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={formTitle}>
                <div className="row">
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input
                                ref={register({
                                    required: "Campo obrigatório",
                                    minLength: { value: 5, message: 'O campo deve ter no minimo 5 caracteres' },
                                    maxLength: { value: 60, message: 'O campo deve ter no máximo 60 caracteres' }
                                })}
                                name="name"
                                type="text"
                                placeholder="Nome do produto"
                                className="form-control  input-base"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <Controller
                                as={Select}
                                name="categories"
                                rules={{required: true}}
                                control={control}
                                options={categories}
                                isLoading={isLoadingCategories}
                                getOptionLabel={(option: Category) => option.name}
                                getOptionValue={(option: Category) => String(option.id)}
                                classNamePrefix="categories-select"
                                isMulti
                                placeholder="Categorias"
                            />
                             {errors.price && (
                                <div className="invalid-feedback d-block">
                                    Campo obrigatório
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input
                                ref={register({ required: "Campo obrigatório" })}
                                name="price"
                                type="number"
                                className="form-control  input-base"
                                placeholder="Preço"

                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input
                                ref={register({ required: "Campo obrigatório" })}
                                name="imgUrl"
                                type="text"
                                className="form-control  input-base"
                                placeholder="imagem do produto"
                            />
                            {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-6 mb-5">
                        <textarea
                            name="description"
                            ref={register({ required: "Campo obrigatório" })}
                            cols={30}
                            rows={10}
                            placeholder="Descrição"
                            className="form-control  input-base"
                        />
                        {errors.description && (
                            <div className="invalid-feedback d-block">
                                {errors.description.message}
                            </div>
                        )}
                    </div>
                </div>
            </BaseForm>
        </form>
    );
}

export default Form;