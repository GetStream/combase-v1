import * as Yup from 'yup';

const requiredError = 'This is required.';
const emailError = 'Invalid Email Address.';


export default Yup.object().shape({
    invitations: Yup.array().of(
        Yup.object().shape({
            email: Yup.string()
                .email(emailError)
                .required(requiredError),
            name: Yup.object().shape({
                first: Yup.string().required(requiredError),
                last: Yup.string().required(requiredError),
            })
        })
    ),
})
