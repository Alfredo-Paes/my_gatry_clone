import { yupToFormErrors } from 'formik';
import * as yup from 'yup';

export default yup.object().shape({
    title: yup.string().required('Titúlo é um campo obrigatório'),
    url: yup.string().url('URL deve ser válida').required('Inserir a URL da promoção, é um campo obrigatório'),
    imageUrl: yup.string().url('URL deve ser válida').required('Inserir a URL da imagem do produto, é um campo obrigatório'),
    price: yup.number().required('Valor do produto é um campo obrigatório'),
});