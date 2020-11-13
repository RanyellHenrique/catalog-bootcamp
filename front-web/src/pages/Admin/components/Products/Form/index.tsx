import React, { useState } from 'react';
import './styles.scss';
import BaseForm from '../../BaseForm';
import { makePrivateRequest } from 'core/utils/request';

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
}

type formEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '', price: '', category: '1', description: ''
    });

    const handleOnChange = (event: formEvent) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://cdn.awsli.com.br/300x300/1147/1147622/produto/71051088/3f1c1728dd.jpg',
            categories: [{ id: formData.category }]
        }
        makePrivateRequest({ url: '/products', method: 'POST', data: payload })
            .then(() => {
                setFormData({name:'', category:'1', price:'', description: ''});
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="CADASTRAR UM PRODUTO">
                <div className="row">
                    <div className="col-6">
                        <input
                            value={formData.name}
                            name="name"
                            type="text"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                        />
                        <select
                            value={formData.category}
                            name="category"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                        >
                            <option value="1">Livros</option>
                            <option value="3">Computadores</option>
                            <option value="2">Eletrônicos</option>
                        </select>
                        <input
                            value={formData.price}
                            name="price"
                            type="text"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="col-6">
                        <textarea
                            name="description"
                            value={formData.description}
                            cols={30}
                            rows={10}
                            className="form-control mb-5"
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
            </BaseForm>
        </form>
    );
}

export default Form;