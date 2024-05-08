import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const changeHandler = (event) => {
    setData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const loginUser = async (event) => {
    event.preventDefault();

    const { email, password } = data;

    try {
      const { data } = await axios.post('/login', {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData('');
        toast.success(data);
        navigate('/dashboard');
      }
    } catch (error) {
      // toast.error(error);
    }
  };
  return (
    <div className="container mt-32">
      <form
        onSubmit={loginUser}
        className="bg-slate-900 mx-auto gap-6 rounded-xl max-w-[320px] p-12 text-slate-100 flex items-start flex-col "
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email."
            className="rounded-xl px-3 py-1 text-slate-900"
            value={data.email}
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password."
            className="rounded-xl px-3 py-1 text-slate-900"
            value={data.password}
            onChange={changeHandler}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-slate-100 rounded-full px-4 py-1 mx-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
