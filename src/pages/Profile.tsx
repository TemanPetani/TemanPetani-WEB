import Layout from '../components/Layout';
import placeImage from '../assets/placeholder_profile.svg';

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
// import api from '../utils/api';
import { getUsers } from '../utils/type';
import { data as dataProfil } from '../json/dummyProfil.json';

import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import LoadingFull from '../components/LoadingFull';
import { FaEdit } from 'react-icons/fa';
import { Modals } from '../components/Modals';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Input,
  InputFile,
  InputPass,
  Select,
  TextArea,
} from '../components/Input';

// SCHEMA YUP
const schemaEmail = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Required'),
});
const schemaFullname = Yup.object().shape({
  fullname: Yup.string().min(6, 'atleat 6 character').required('Required'),
});
const schemaPhone = Yup.object().shape({
  phone: Yup.string().required('Required'),
});
const schemaBank = Yup.object().shape({
  bank: Yup.string().required('Required'),
});
const schemaAddress = Yup.object().shape({
  address: Yup.string().required('Required'),
});
const schemaRekening = Yup.object().shape({
  noRekening: Yup.string().required('Required'),
});
const schemaAvatar = Yup.object().shape({
  avatar: Yup.mixed().required('Required'),
});
const schemaPassword = Yup.object().shape({
  old_password: Yup.string().required('Required'),
  password: Yup.string()
    .required('Required with Uppercase, number and Symbol')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .matches(/[!@#$%^&*()]/, 'Must contain at least one symbol')
    .min(8, 'Must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'password must match')
    .required('Required'),
});

const Profile = () => {
  const [dataProfile, setDataProfile] = useState<getUsers>();
  const [load, setLoad] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const MySwal = withReactContent(swal);
  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies(['user_id', 'token', 'pp', 'role']);
  const ckToken = cookie.token;
  const ckRole = cookie.role;
  const ckPP = cookie.pp;

  // const fetchProfile = async () => {
  //   setLoad(true);
  //   await api
  //     .getUserById(ckToken)
  //     .then(async (response) => {
  //       const { data } = response.data;
  //       await setDataProfile(data);
  //       await checkPP(data.profile_picture);
  //       await checkRole(data.role);
  //     })
  //     .catch((error) => {
  //       const { data } = error.response;
  //       MySwal.fire({
  //         icon: 'error',
  //         title: 'Failed',
  //         text: `error :  ${data.message}`,
  //         showCancelButton: false,
  //       });
  //     })
  //     .finally(() => setLoad(false));
  // };

  const checkPP = async (data: string) => {
    if (ckPP !== data && data !== undefined) {
      await setCookie('pp', data, { path: '/' });
    }
  };
  const checkRole = async (data: string) => {
    if (ckRole !== data && data !== undefined) {
      await setCookie('role', data, { path: '/' });
    }
  };

  //FORMIK

  const formikFullname = useFormik({
    initialValues: {
      fullname: '',
    },
    validationSchema: schemaFullname,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const formikEmail = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: schemaEmail,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const formikPhone = useFormik({
    initialValues: {
      phone: '',
    },
    validationSchema: schemaPhone,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const formikBank = useFormik({
    initialValues: {
      bank: '',
    },
    validationSchema: schemaBank,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const formikAddress = useFormik({
    initialValues: {
      address: '',
    },
    validationSchema: schemaAddress,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const formikNoRekening = useFormik({
    initialValues: {
      noRekening: '',
    },
    validationSchema: schemaRekening,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const formikAvatar = useFormik({
    initialValues: {
      avatar: '',
    },
    validationSchema: schemaAvatar,
    onSubmit: async (values) => {
      formDataToPut(values);
    },
  });
  const formikPassword = useFormik({
    initialValues: {
      password: '',
      old_password: '',
      confirmPassword: '',
    },
    validationSchema: schemaPassword,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formikAvatar.setFieldValue('avatar', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const formDataToPut = async (datad?: any) => {
    const formData = new FormData();
    formData.append('avatar', datad.avatar);
    await console.log(formData);
  };

  useEffect(() => {
    // fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      {load ? (
        <LoadingFull />
      ) : (
        <>
          <Modals id="modal-edit-fullname">
            <form
              onSubmit={formikFullname.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Edit Nama
              </p>
              <div className="flex flex-col w-full">
                <p className=" self-start">Nama Lama:</p>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={dataProfil.user.fullname}
                  disabled={true}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className=" self-start">Nama Baru:</p>{' '}
                <Input
                  id="fullname"
                  name="fullname"
                  label="Nama baru anda"
                  type="text"
                  value={formikFullname.values.fullname}
                  onChange={formikFullname.handleChange}
                  onBlur={formikFullname.handleBlur}
                  error={formikFullname.errors.fullname}
                  touch={formikFullname.touched.fullname}
                />
              </div>

              <div className="w-full flex justify-end gap-3">
                <div className="modal-action mt-0 ">
                  <label
                    htmlFor="modal-edit-fullname"
                    className="btn btn-ghost"
                  >
                    Kembali
                  </label>
                  <button
                    id="btn-submit-email"
                    type="submit"
                    className="btn btn-primary w-32 text-white"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </Modals>
          <Modals id="modal-edit-email">
            <form
              onSubmit={formikEmail.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Edit Email
              </p>
              <div className="flex flex-col w-full">
                <p className=" self-start">Email Lama:</p>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  value={dataProfil.user.email}
                  disabled={true}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className=" self-start">Email Baru:</p>{' '}
                <Input
                  id="email"
                  name="email"
                  label="Email baru anda"
                  type="text"
                  value={formikEmail.values.email}
                  onChange={formikEmail.handleChange}
                  onBlur={formikEmail.handleBlur}
                  error={formikEmail.errors.email}
                  touch={formikEmail.touched.email}
                />
              </div>

              <div className="w-full flex justify-end gap-3">
                <div className="modal-action mt-0 ">
                  <label
                    htmlFor="modal-edit-email"
                    className="btn btn-ghost"
                  >
                    Kembali
                  </label>
                  <button
                    id="btn-submit-email"
                    type="submit"
                    className="btn btn-primary w-32 text-white"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </Modals>
          <Modals id="modal-edit-phone">
            <form
              onSubmit={formikPhone.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Edit Telepon
              </p>
              <div className="flex flex-col w-full">
                <p className=" self-start">Nomor Telepon Lama:</p>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  value={dataProfil.user.phone}
                  disabled={true}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className=" self-start">Nomor telepon baru:</p>{' '}
                <Input
                  id="phone"
                  name="phone"
                  label="Telepon baru anda"
                  type="text"
                  value={formikPhone.values.phone}
                  onChange={formikPhone.handleChange}
                  onBlur={formikPhone.handleBlur}
                  error={formikPhone.errors.phone}
                  touch={formikPhone.touched.phone}
                />
              </div>

              <div className="w-full flex justify-end gap-3">
                <div className="modal-action mt-0 ">
                  <label
                    htmlFor="modal-edit-phone"
                    className="btn btn-ghost"
                  >
                    Kembali
                  </label>
                  <button
                    id="btn-submit-phone"
                    type="submit"
                    className="btn btn-primary w-32 text-white"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </Modals>
          <Modals id="modal-edit-address">
            <form
              onSubmit={formikAddress.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Edit Alamat
              </p>
              <div className="flex flex-col w-full">
                <p className=" self-start">Alamat Lama:</p>
                <TextArea
                  id="address"
                  name="address"
                  value={dataProfil.user.address}
                  disabled={true}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className=" self-start">Alamat Baru:</p>{' '}
                <TextArea
                  id="address"
                  name="address"
                  label="Alamat baru anda"
                  value={formikAddress.values.address}
                  onChange={formikAddress.handleChange}
                  onBlur={formikAddress.handleBlur}
                  error={formikAddress.errors.address}
                  touch={formikAddress.touched.address}
                />
              </div>

              <div className="w-full flex justify-end gap-3">
                <div className="modal-action mt-0 ">
                  <label
                    htmlFor="modal-edit-address"
                    className="btn btn-ghost"
                  >
                    Kembali
                  </label>
                  <button
                    id="btn-submit-address"
                    type="submit"
                    className="btn btn-primary w-32 text-white"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </Modals>
          <Modals id="modal-edit-rekening">
            <form
              onSubmit={formikNoRekening.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Edit Rekening
              </p>
              <div className="flex flex-col w-full">
                <p className=" self-start">Rekening Lama:</p>
                <Input
                  id="noRekening"
                  name="noRekening"
                  type="text"
                  value={dataProfil.user.noRekening}
                  disabled={true}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className=" self-start">Rekening baru:</p>{' '}
                <Input
                  id="noRekening"
                  name="noRekening"
                  label="Rekening baru anda"
                  type="text"
                  value={formikNoRekening.values.noRekening}
                  onChange={formikNoRekening.handleChange}
                  onBlur={formikNoRekening.handleBlur}
                  error={formikNoRekening.errors.noRekening}
                  touch={formikNoRekening.touched.noRekening}
                />
              </div>

              <div className="w-full flex justify-end gap-3">
                <div className="modal-action mt-0 ">
                  <label
                    htmlFor="modal-edit-rekening"
                    className="btn btn-ghost"
                  >
                    Kembali
                  </label>
                  <button
                    id="btn-submit-rekening"
                    type="submit"
                    className="btn btn-primary w-32 text-white"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </Modals>
          <Modals id="modal-edit-bank">
            <form
              onSubmit={formikBank.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Edit Bank
              </p>
              <div className="flex flex-col w-full">
                <p className=" self-start">Bank Lama:</p>
                <Input
                  id="bank"
                  name="bank"
                  type="text"
                  value={dataProfil.user.bank}
                  disabled={true}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className=" self-start">Bank Baru:</p>{' '}
                <Select
                  id="bank"
                  name="bank"
                  label="Bank"
                  value={formikBank.values.bank}
                  onChangeSelect={formikBank.handleChange}
                  onBlur={formikBank.handleBlur}
                  error={formikBank.errors.bank}
                  touch={formikBank.touched.bank}
                >
                  <option value="bri">BRI</option>
                  <option value="bca">BCA</option>
                  <option value="bni">BNI</option>
                </Select>
              </div>

              <div className="w-full flex justify-end gap-3">
                <div className="modal-action mt-0 ">
                  <label
                    htmlFor="modal-edit-bank"
                    className="btn btn-ghost"
                  >
                    Kembali
                  </label>
                  <button
                    id="btn-submit-bank"
                    type="submit"
                    className="btn btn-primary w-32 text-white"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </Modals>
          <Modals id="modal-edit-password">
            <form
              onSubmit={formikPassword.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Edit Password
              </p>

              <div className="flex flex-col w-full">
                <p className=" self-start">Password Lama:</p>{' '}
                <InputPass
                  id="old_password"
                  name="old_password"
                  label="Password lama anda"
                  type="password"
                  value={formikPassword.values.old_password}
                  onChange={formikPassword.handleChange}
                  onBlur={formikPassword.handleBlur}
                  error={formikPassword.errors.old_password}
                  touch={formikPassword.touched.old_password}
                />
              </div>
              <div className="flex flex-col w-full">
                <p className=" self-start">Bank Baru:</p>{' '}
                <InputPass
                  id="password"
                  name="password"
                  label="Password baru anda"
                  type="password"
                  value={formikPassword.values.password}
                  onChange={formikPassword.handleChange}
                  onBlur={formikPassword.handleBlur}
                  error={formikPassword.errors.password}
                  touch={formikPassword.touched.password}
                />
              </div>
              <div className="flex flex-col w-full">
                <p className=" self-start">Konfirmasi Password Baru:</p>{' '}
                <InputPass
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Ketik ulang password baru anda"
                  type="password"
                  value={formikPassword.values.confirmPassword}
                  onChange={formikPassword.handleChange}
                  onBlur={formikPassword.handleBlur}
                  error={formikPassword.errors.confirmPassword}
                  touch={formikPassword.touched.confirmPassword}
                />
              </div>

              <div className="w-full flex justify-end gap-3">
                <div className="modal-action mt-0 ">
                  <label
                    htmlFor="modal-edit-password"
                    className="btn btn-ghost"
                  >
                    Kembali
                  </label>
                  <button
                    id="btn-submit-password"
                    type="submit"
                    className="btn btn-primary w-32 text-white"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </Modals>
          <Modals id="modal-edit-avatar">
            <form
              onSubmit={formikAvatar.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Edit Avatar
              </p>

              <div className="w-full h-full p-3">
                <img
                  src={
                    preview
                      ? preview
                      : 'https://placehold.co/600x400/png?text=placeholder+image'
                  }
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <InputFile
                id="avatar"
                name="avatar"
                label="avatar name"
                onChange={handleImageChange}
                onBlur={formikAvatar.handleBlur}
                error={formikAvatar.errors.avatar}
                touch={formikAvatar.touched.avatar}
              />

              <div className="w-full flex justify-end gap-3">
                <div className="modal-action mt-0 ">
                  <label
                    htmlFor="modal-edit-avatar"
                    className="btn btn-ghost"
                  >
                    Kembali
                  </label>
                  <button
                    type="submit"
                    className="btn btn-primary w-32 text-white"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </Modals>
          <Layout
            chose="section"
            addClass="bg-base-100 flex py-12 justify-center px-20 -mt-[67px] xl:-mt-[64px] "
          >
            <div className="flex">
              <div className="flex md:flex-row flex-col items-center justify-center gap-10">
                <div className="card w-fit h-fit pb-5">
                  <div className="p-1 bg-slate-300 rounded-full relative">
                    <img
                      src={
                        dataProfile?.avatar ? dataProfile?.avatar : placeImage
                      }
                      alt={`User's profile picture`}
                      className="h-80 w-80 border-spacing-1 rounded-full object-cover object-center"
                    />
                    <div className="bottom-7 right-7 absolute">
                      <label
                        htmlFor="modal-edit-avatar"
                        className="btn btn-primary btn-circle p-3 text-lg"
                      >
                        <FaEdit />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="flex flex-col gap-2 mb-8">
                    <p className="text-xl">
                      Nama:{' '}
                      <span className="font-semibold">
                        {' '}
                        {dataProfil.user.fullname}
                      </span>{' '}
                      &emsp;
                      <label
                        htmlFor="modal-edit-fullname"
                        className="link link-primary"
                      >
                        edit
                      </label>
                    </p>
                    <p className="text-xl">
                      Email:{' '}
                      <span className="font-semibold">
                        {' '}
                        {dataProfil.user.email}
                      </span>{' '}
                      &emsp;
                      <label
                        htmlFor="modal-edit-email"
                        className="link link-primary"
                      >
                        edit
                      </label>
                    </p>
                    <p className="text-xl">
                      Telepon:{' '}
                      <span className="font-semibold">
                        {' '}
                        {dataProfil.user.phone}
                      </span>{' '}
                      &emsp;
                      <label
                        htmlFor="modal-edit-phone"
                        className="link link-primary"
                      >
                        edit
                      </label>
                    </p>
                    <p className="text-xl">
                      Alamat:{' '}
                      <span className="font-semibold">
                        {' '}
                        {dataProfil.user.address}
                      </span>{' '}
                      &emsp;
                      <label
                        htmlFor="modal-edit-address"
                        className="link link-primary"
                      >
                        edit
                      </label>
                    </p>
                    <p className="text-xl">
                      Rekening:{' '}
                      <span className="font-semibold">
                        {' '}
                        {dataProfil.user.noRekening}
                      </span>{' '}
                      &emsp;
                      <label
                        htmlFor="modal-edit-rekening"
                        className="link link-primary"
                      >
                        edit
                      </label>
                    </p>
                    <p className="text-xl">
                      Bank:{' '}
                      <span className="font-semibold uppercase">
                        {' '}
                        {dataProfil.user.bank}
                      </span>{' '}
                      &emsp;
                      <label
                        htmlFor="modal-edit-bank"
                        className="link link-primary"
                      >
                        edit
                      </label>
                    </p>
                  </div>
                  <div className="flex w-full pt-5 gap-4">
                    <label
                      htmlFor="modal-edit-password"
                      className="btn btn-primary w-36 text-white"
                    >
                      Ganti Password
                    </label>

                    <button
                      className="btn btn-error w-36 text-white"
                      disabled={ckRole === 'admin'}
                    >
                      Hapus Akun
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        </>
      )}
    </Layout>
  );
};
export default Profile;
