import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { Formik, Form } from 'formik';
import Field from 'components/Form/Field/FormField';
import useApi from 'components/utils/useApi';
import AnimationLoading from 'components/Animation/Loading/AnimationLoading';
import loading_lottie from 'assets/lotties/loading_lottie';
import AnimationSave from 'components/Animation/Save/AnimationSave';
import save_lottie from 'assets/lotties/save_lottie';
import schema from './schema';
import UIButton from 'components/UI/Button/Button';
import './PromotionForm.css';

const initialValue = {
    title: '',
    url: '',
    imageUrl: '',
    price: 0,
};

const PromotionForm = ({id}) => {
    const history = useHistory();
    const [load, loadInfo] = useApi({
        url:`/promotions/${id}`,
        method: 'get',
    });

    const [save, saveInfo] = useApi({
        url: id ? `http://localhost:8000/promotions/${id}` : `http://localhost:8000/promotions/`,
        method: id ? 'put' : 'post',
        onCompleted: (response) => {
            if(!response.error){
                history.push('/');
            }
        }
    });

    useEffect(() => {
        if(id){
            load();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    function onSubmit(formValues){
        save({
            data: formValues,
        });
    };

    const values = id ? loadInfo.data : initialValue;

    return (

        <div>
            <h1>{`Gatry Clone`}</h1>
            <h2>{id ? `Editar Promoção` : `Nova Promoção`}</h2>

            {!values ? (
                <AnimationLoading
                    lotti={loading_lottie}
                    width={120}
                    height={120}
                />
            ) : (

                <Formik
                    onSubmit={onSubmit}
                    initialValues={values}
                    validationSchema={schema}
                    render={() => (
                        <Form>
                            {saveInfo.loading && <AnimationSave lotti={save_lottie} width={25} height={25} id={id}/>}
                            <div className="promotion-form__group">
                                <Field 
                                    name="title" 
                                    type="text" 
                                    label="Título"
                                />
                            </div>
                            <div className="promotion-form__group">
                                <label htmlFor="price">{``}</label>
                                <Field 
                                    name="price" 
                                    type="number" 
                                    label="Preço"
                                />
                            </div>
                            <div className="promotion-form__group">
                                <Field 
                                    name="url" 
                                    type="text" 
                                    label="Link"
                                />
                            </div>
                            <div className="promotion-form__group">
                                <Field 
                                    name="imageUrl"
                                    type="text" 
                                    label="Imagem(URL)"
                                />
                            </div>
                            <div>
                                <UIButton
                                    component="button"
                                    theme={id? `contained-yellow`:`contained-green`}
                                    type="submit"
                                >
                                    {id ? `Editar` : `Salvar`}
                                </UIButton>
                            </div>
                        </Form>
                    )}
                />
            
            )}
        </div>

    );
};

export default PromotionForm;