import * as Yup from 'yup';

const requiredError = 'This is required.';
const emailError = 'Invalid email address.';

export default Yup.object().shape({
    name: Yup.object().shape({
        first: Yup.string().required(requiredError),
        last: Yup.string().required(requiredError),
    }),
    email: Yup.string().email(emailError).required(requiredError),
    title: Yup.string().required(requiredError),
});
