import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import { Input, InputPass } from '../components/Input';
import Layout from '../components/Layout';

import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import * as Yup from 'yup';
// import api from "../utils/api";
// import { PostLogin } from "../utils/type";
import { useCookies } from 'react-cookie';
import bg from '../assets/hero_unsplash_1.png';

const schema = Yup.object().shape({
  email: Yup.string().email('please enter a valid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const MySwal = withReactContent(swal);
  const navigate = useNavigate();

  const [, setCookie] = useCookies(['user_id', 'token']);

  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: schema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  // const postLogin = async (code: PostLogin) => {
  //   await api
  //     .postLogin(code)
  //     .then((response) => {
  //       const { data, message } = response.data;
  //       MySwal.fire({
  //         title: "Success",
  //         text: message,
  //         showCancelButton: false,
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           setCookie("user_id", data.user_id, { path: "/" });
  //           setCookie("token", data.token, { path: "/" });
  //           navigate(`/`);
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       const { data } = error.response;
  //       MySwal.fire({
  //         icon: "error",
  //         title: "Failed",
  //         text: `error :  ${data.message}`,
  //         showCancelButton: false,
  //       });
  //     });
  // };

  return (
    <Layout
      chose="section"
      addClass="h-screen bg-gradient-to-br from-neutral to-primary flex justify-center items-center"
    >
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="w-4/5 h-5/6 bg-[-6rem] rounded-3xl flex p-20 items-center bg-cover md:bg-center"
      >
        <div className="md:w-2/5 lg:w-4/6 w-0 h-full"></div>
        <form
          className="md:w-3/5 lg:w-2/6 w-full h-max flex flex-col justify-center  p-10 gap-6 bg-neutral/30 md:bg-base-100/20 backdrop-blur-sm rounded-3xl"
          onSubmit={handleSubmit}
        >
          <p className="text-4xl font-semibold text-base-100">Log in.</p>
          <p className="font-light text-sm text-base-100 ">
            Log in dengan data anda yang anda masukkan saat register
          </p>

          <Input
            id="email"
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
            id="password"
            name="password"
            label="ketik password anda disini"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touch={touched.password}
          />

          <button
            id="login-button"
            className="btn btn-primary mt-3 text-white"
            type="submit"
          >
            LOGIN
          </button>
          <p className="text-sm text-base-100">
            Belum punya akun?{' '}
            <Link
              id="to-register"
              className="font-semibold"
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
