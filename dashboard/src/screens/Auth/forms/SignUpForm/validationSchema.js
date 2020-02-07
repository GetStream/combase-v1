import * as Yup from 'yup';

const requiredError = 'This is required.';
const emailError = 'Invalid Email Address.';

export default Yup.object().shape({
    name: Yup.object().shape({
        first: Yup.string().required(requiredError),
        last: Yup.string().required(requiredError),
    }),
    email: Yup.string()
        .email(emailError)
        .required(requiredError),
    password: Yup.string().required(requiredError),
    confirm: Yup.string().when('password', {
        is: val => val && val.length > 0,
        then: Yup.string()
            .oneOf([Yup.ref('password')], 'Both passwords need to be the same')
            .required(requiredError),
    }),
});
