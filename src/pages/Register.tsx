import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import { Input, InputPass } from '../components/Input';
import Layout from '../components/Layout';

import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import bg from '../assets/hero_unsplash_1.png';
import { useState } from 'react';
import { PostRegis } from '../utils/type';
import api from '../utils/api';

const schema = Yup.object().shape({
  email: Yup.string().email('please enter a valid email').required('Required'),
  fullname: Yup.string().min(3, 'atleat 3 character long').required('Required'),
  address: Yup.string().min(6, 'atleat 6 character long').required('Required'),
  phone: Yup.number().required('Required'),
  password: Yup.string()
    .required('Required with Uppercase, number and Symbol')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .matches(/[!@#$%^&*()]/, 'Must contain at least one symbol')
    .min(8, 'Must be at least 8 characters long'),
});

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);

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
        values.phone = values.phone.toString();
        postRegis(values);
      },
    });

  const postRegis = async (code: PostRegis) => {
    setLoading(true);
    await api
      .postRegister(code)
      .then((response) => {
        const { message } = response.data;
        MySwal.fire({
          title: 'Success',
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/login`);
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
          onSubmit={handleSubmit}
          className="md:w-7/12 w-full h-max flex flex-col justify-center p-5 md:p-7 gap-4 bg-black/40 md:bg-black/20 backdrop-blur-sm rounded-3xl"
        >
          <p className="text-2xl font-semibold text-base-100">Buat Akun</p>
          <p className="text-sm text-base-100">
            Sudah punya akun?{' '}
            <Link
              id="to-login"
              className="font-semibold tracking-wider"
              to={'/login'}
            >
              Log in disini
            </Link>
          </p>
          <div className="w-full flex flex-col gap-3">
            <Input
              id="input-fullname"
              name="fullname"
              label="Ketik nama anda disini"
              type="text"
              value={values.fullname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.fullname}
              touch={touched.fullname}
            />

            <div className="flex flex-row gap-4">
              <Input
                id="input-phone"
                name="phone"
                label="Ketik telepon anda disini"
                type="text"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
                touch={touched.phone}
              />

              <Input
                id="input-address"
                name="address"
                label="Ketik alamat anda disini"
                type="text"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.address}
                touch={touched.address}
              />
            </div>

            <Input
              id="input-email"
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
              id="input-password"
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

          {loading === true ? (
            <button
              id="signup-button-loading"
              className="btn btn-primary mt-3 text-white "
              type="button"
            >
              <span className="loading loading-spinner"></span>
            </button>
          ) : (
            <button
              id="signup-button"
              className="btn btn-primary mt-3 text-white "
              type="submit"
            >
              Sign Up
            </button>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default Register;
