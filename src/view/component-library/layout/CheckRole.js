import { useSelector } from 'react-redux';
import { account_info } from 'reducer/accountReducer';

const CheckRole = ({ allowedRoleId, children }) => {
    const account = useSelector(account_info);

    if (allowedRoleId <= account.roleId) {
        return children;
    }
    return null;
};

export default CheckRole;
