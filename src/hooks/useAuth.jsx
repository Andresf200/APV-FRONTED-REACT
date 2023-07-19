import {useContext} from 'react';
import AuthContentx from '../context/AuthProvicer';

const useAuth = () => {
    return useContext(AuthContentx);
};

export default useAuth;