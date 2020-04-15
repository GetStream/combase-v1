import React from 'react';
import { useAuth } from 'contexts/Auth';

export default WrappedComponent => props => {
    const [{ organization, user }] = useAuth();
    return <WrappedComponent {...props} {...{ organization, user }} />
}