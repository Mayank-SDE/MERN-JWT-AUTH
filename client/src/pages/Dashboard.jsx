import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="text-slate-900 mx-auto">
      {user && <h1>{user.name}</h1>}
      <button
        onClick={() => {
          setUser(null);
          navigate('/');
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
