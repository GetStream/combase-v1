import * as Yup from 'yup';

export default Yup.object().shape({
    welcome: Yup.object().shape({
        enabled: Yup.bool(),
        message: Yup.string()
    }),
    response: Yup.string(),
});
