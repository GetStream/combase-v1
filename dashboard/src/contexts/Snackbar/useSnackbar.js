import { useContext } from 'react';
import SnackbarContext from './index';

export default () => {
    const { addSnackbar, queueSnackbar } = useContext(SnackbarContext);
    return { addSnackbar, queueSnackbar };
};
