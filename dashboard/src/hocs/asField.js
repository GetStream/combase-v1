import React from 'react';
import { useField } from 'formik';

export default WrappedInput => props => {
    const [field, meta] = useField(props);
    return <WrappedInput {...props} {...field} error={meta.error} touched={meta.touched} />;
};
