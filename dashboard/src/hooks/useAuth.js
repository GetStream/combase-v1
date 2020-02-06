import { useContext } from 'react';
import AuthContext from 'contexts/Auth';

export default () => {
    const { user, loading, error, login, logout } = useContext(AuthContext);
    return [user, { loading, error, login, logout }];
};
