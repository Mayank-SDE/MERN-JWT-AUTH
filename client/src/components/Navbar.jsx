import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="container flex justify-around items-center h-[60px] bg-slate-900 text-slate-100">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default Navbar;
