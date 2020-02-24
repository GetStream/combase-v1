import React from 'react';
import { useField } from 'formik';

export default WrappedInput => props => {
    const [field, meta] = useField(props);
    console.log(meta.error);
    return <WrappedInput {...props} {...field} error={meta.error} />;
};
