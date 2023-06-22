import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import { Input, InputPass, TextArea } from '../components/Input';
import Layout from '../components/Layout';

import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import api from "../utils/api";
// import { PostRegis } from "../utils/type";
import bg from '../assets/hero_unsplash_1.png';

const schema = Yup.object().shape({
  email: Yup.string().email('please enter a valid email').required('Required'),
  fullname: Yup.string().min(3, 'atleat 3 character long').required('Required'),
  address: Yup.string().min(6, 'atleat 6 character long').required('Required'),
  phone: Yup.string().required('Required'),
  password: Yup.string()
    .required('Required with Uppercase, number and Symbol')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .matches(/[!@#$%^&*()]/, 'Must contain at least one symbol')
    .min(8, 'Must be at least 8 characters long'),
});

const Register = () => {
  const MySwal = withReactContent(swal);
  const navigate = useNavigate();

  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: {
        fullname: '',
        email: '',
        password: '',
        phone: '',
        address: '',
      },
      validationSchema: schema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  // const postRegis = async (code: PostRegis) => {
  //   await api
  //     .postRegister(code)
  //     .then((response) => {
  //       const { message } = response.data;
  //       MySwal.fire({
  //         title: "Success",
  //         text: message,
  //         showCancelButton: false,
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           navigate(`/login`);
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
          onSubmit={handleSubmit}
          className="md:w-3/5 lg:w-2/6 w-full h-max flex flex-col justify-center  p-10 gap-6 bg-neutral/30 md:bg-base-100/20 backdrop-blur-sm rounded-3xl"
        >
          <p className="text-2xl font-semibold text-base-100">Buat Akun</p>
          <p className="text-sm text-base-100">
            Sudah punya akun?{' '}
            <Link
              id="to-login"
              className="font-semibold"
              to={'/login'}
            >
              Log in disini
            </Link>
          </p>
          <div className="w-full flex flex-col gap-4">
            <Input
              id="fullname"
              name="fullname"
              label="Ketik nama anda disini"
              type="text"
              value={values.fullname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.fullname}
              touch={touched.fullname}
            />

            <Input
              id="phone"
              name="phone"
              label="Ketik telepon anda disini"
              type="text"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              touch={touched.phone}
            />

            <TextArea
              id="address"
              name="address"
              label="Ketik alamat anda disini"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.address}
              touch={touched.address}
            />

            <Input
              id="email"
              name="email"
              label="Ketik email anda disini"
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
              label="Ketik password anda disini"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touch={touched.password}
            />
          </div>

          <button
            id="signup"
            className="btn btn-primary mt-3 text-white"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
