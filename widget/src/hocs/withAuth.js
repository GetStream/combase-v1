import React from 'react';
import useAuth from 'hooks/useAuth';

export default WrappedComponent => props => {
    const [{ organization, user }] = useAuth();
    return <WrappedComponent {...props} {...{organization, user}} />
}