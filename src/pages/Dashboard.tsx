import { Outlet } from 'react-router-dom';
import { setToLocalStorage } from '../utils/localStorage';

function Dashboard() {
  const res = setToLocalStorage('Token', 'falladsgsdg45a56622');
  console.log(res);

  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}

export default Dashboard;
