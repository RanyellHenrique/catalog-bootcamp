import React, { useEffect, useState } from 'react';
import './styles.scss';
import BaseForm from '../../BaseForm';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Category } from 'core/types/Products';
import ImageUpload from '../ImageUpload';

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
    const [uploadedImgUrl, setUploadedImgUrl] = useState('');
    const [productImgUrl, setProductImgUrl] = useState('');


    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'Editar um produto' : 'Cadastrar um produto';

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
                .then(response => {
                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('description', response.data.description);
                    setValue('categories', response.data.categories);
                    setProductImgUrl(response.data.imgUrl);
                });
        }
    }, [productId, isEditing, setValue])

    useEffect(() => {
        SetIsLoadingCategories(true);
        makeRequest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => SetIsLoadingCategories(false))
    }, []);


    const onSubmit = (data: FormState) => {
        const payload = {
            ...data,
            imgUrl: uploadedImgUrl || productImgUrl
        }
        makePrivateRequest({
            url: isEditing ? `/products/${productId}` : '/products',
            method: isEditing ? 'PUT' : 'POST',
            data: payload
        })
            .then(() => {
                toast.info('Produto Salvo com sucesso!');
                history.push('/admin/products');
            })
            .catch(() => {
                toast.error('Error ao salvar produto!')
            })
    }

    const onUploadSucess = (imgUrl: string) => {
        setUploadedImgUrl(imgUrl);
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
                                data-testid="name"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <label htmlFor="categories" className="d-none">Categorias</label>
                            <Controller
                                as={Select}
                                name="categories"
                                rules={{ required: true }}
                                control={control}
                                options={categories}
                                isLoading={isLoadingCategories}
                                getOptionLabel={(option: Category) => option.name}
                                getOptionValue={(option: Category) => String(option.id)}
                                classNamePrefix="categories-select"
                                isMulti
                                placeholder="Categorias"
                                inputId="categories"
                                data-testid="categories"
                                defaultValue=""
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
                                data-testid="price"

                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <ImageUpload
                                onUploadSucess={onUploadSucess}
                                productImgUrl={productImgUrl}
                            />
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
                            data-testid="description"
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