import * as Yup from 'yup';

const requiredError = 'This is required.';
const emailError = 'Invalid Email Address.';


export default Yup.object().shape({
    name: Yup.string().required(requiredError)
});
