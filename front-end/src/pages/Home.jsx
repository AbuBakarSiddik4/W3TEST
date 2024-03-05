import { useContext } from 'react';
import History from '../components/History';
import WalletForm from '../components/WalletForm';
import AuthContext from '../contexts/Auth';
import AdminDashboard from '../components/AdminDashboard';

const Home = () => {
    const { isAdmin } = useContext(AuthContext);
    console.log(isAdmin);
    return (
        <>
            <WalletForm />
            <History />
            {isAdmin && <AdminDashboard />}
        </>
    )
}

export default Home;