import * as Yup from 'yup';

const requiredError = 'This is required.';
const emailError = 'Invalid Email Address.';

export default Yup.object().shape({
    email: Yup.string()
        .email(emailError)
        .required(requiredError),
    password: Yup.string().required(requiredError),
});
