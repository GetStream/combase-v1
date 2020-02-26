import * as Yup from 'yup';

const requiredError = 'This is required.';
const emailError = 'Invalid email address.';

// TODO: Only required if boolean is true.
export default Yup.object().shape({
    name: Yup.string().required(requiredError),
    response: Yup.string(),
    meta: Yup.object().shape({
        tagline: Yup.string().required(requiredError),
        branding: Yup.object().shape({
            logo: Yup.string(),
        }),
    }),
    phone: Yup.object().shape({
        display: Yup.bool(),
        number: Yup.string().required(requiredError)
    }),
    website: Yup.object().shape({
        display: Yup.bool(),
        url: Yup.string().required(requiredError)
    }),
    email: Yup.object().shape({
        display: Yup.bool(),
        address: Yup.string().email(emailError).required(requiredError)
    }),
    welcome: Yup.object().shape({
        enabled: Yup.bool(),
        message: Yup.string()
    }),
    // TODO: Avalability
});
