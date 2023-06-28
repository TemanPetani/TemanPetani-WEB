import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import { Input, InputPass } from '../components/Input';
import Layout from '../components/Layout';

import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import { useCookies } from 'react-cookie';
import bg from '../assets/hero_unsplash_1.png';
import { PostLogin } from '../utils/type';
import { useState } from 'react';
import api from '../utils/api';

const schema = Yup.object().shape({
  email: Yup.string().email('please enter a valid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const MySwal = withReactContent(swal);
  const navigate = useNavigate();

  const [, setCookie] = useCookies(['id', 'role', 'token']);

  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: schema,
      onSubmit: (values) => {
        postLogin(values);
      },
    });

  const postLogin = async (code: PostLogin) => {
    setLoading(true);
    await api
      .postLogin(code)
      .then((response) => {
        const { data, message } = response.data;
        MySwal.fire({
          text: message,
          icon: 'success',
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setCookie('id', data.id, {
              path: '/',
              expires: new Date(Date.now() + 3600000),
            });
            setCookie('role', data.role, {
              path: '/',
              expires: new Date(Date.now() + 3600000),
            });
            setCookie('token', data.token, {
              path: '/',
              expires: new Date(Date.now() + 3600000),
            });
            navigate(`/`);
          }
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${data.message}`,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout
      chose="section"
      addClass="h-screen bg-gradient-to-br from-neutral to-primary flex justify-center items-center"
    >
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="w-4/5 h-5/6 bg-[-6rem] rounded-3xl flex p-5 md:p-10 lg:p-15 items-center bg-cover md:bg-center"
      >
        <div className="md:w-5/12 w-0 h-full"></div>
        <form
          className="md:w-7/12 w-full h-max flex flex-col justify-center p-5 md:p-7 gap-4 bg-black/40 md:bg-black/20 backdrop-blur-sm rounded-3xl"
          onSubmit={handleSubmit}
        >
          <p className="text-4xl font-semibold text-base-100">Log in.</p>
          <p className="font-light text-sm text-base-100 ">
            Log in dengan data anda yang anda masukkan saat register
          </p>

          <Input
            id="input email"
            name="email"
            label="ketik email anda disini"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touch={touched.email}
          />

          <InputPass
            id="input password"
            name="password"
            label="ketik password anda disini"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touch={touched.password}
          />

          {loading === true ? (
            <button
              id="login-button-loading"
              className="btn btn-primary mt-3 text-white "
              type="button"
            >
              <span className="loading loading-spinner"></span>
            </button>
          ) : (
            <button
              id="login-button"
              className="btn btn-primary mt-3 text-white "
              type="submit"
            >
              LOGIN
            </button>
          )}

          <p className="text-sm text-base-100">
            Belum punya akun?{' '}
            <Link
              id="to-register"
              className="font-semibold tracking-wider"
              to={'/register'}
            >
              Register disini
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
