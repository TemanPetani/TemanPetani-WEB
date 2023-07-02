import Layout from '../components/Layout';
import placeImage from '../assets/placeholder_profile.svg';

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
// import api from '../utils/api';
import { getUsers } from '../utils/type';

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
import api from '../utils/api';
import toast from '../utils/toast';

// SCHEMA YUP
const schemaEmail = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Required'),
});
const schemaFullname = Yup.object().shape({
  fullname: Yup.string().min(6, 'atleat 6 character').required('Required'),
});
const schemaPhone = Yup.object().shape({
  phone: Yup.number().required('Required'),
});
const schemaBank = Yup.object().shape({
  bank: Yup.string().required('Required'),
});
const schemaAddress = Yup.object().shape({
  address: Yup.string().required('Required'),
});
const schemaRekening = Yup.object().shape({
  accountNumber: Yup.string().required('Required'),
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
  const MyToast = withReactContent(toast);

  const navigate = useNavigate();

  const [cookie, , removeCookie] = useCookies([
    'id',
    'token',
    'avatar',
    'role',
  ]);
  const ckToken = cookie.token;
  const ckRole = cookie.role;

  const fetchProfile = async () => {
    setLoad(true);
    await api
      .getUserById(ckToken)
      .then((response) => {
        const { data } = response.data;
        setDataProfile(data);
        //   await checkPP(data.profile_picture);
      })
      .catch((error) => {
        const { data, status } = error.response;
        if (status === 401) {
          MySwal.fire({
            title: 'Sesi Telah Berakhir',
            text: 'Harap login ulang untuk melanjutkan.',
            showCancelButton: false,
          }).then(() => {
            removeCookie('token');
            navigate('/login');
          });
        } else {
          MySwal.fire({
            icon: 'error',
            title: 'Failed',
            text: `error :  ${data.message}`,
            showCancelButton: false,
          });
        }
      })
      .finally(() => setLoad(false));
  };

  const putUsers = async (datad?: any) => {
    setLoad(true);
    await api
      .putUserById(ckToken, datad)
      .then((response) => {
        const { message } = response.data;
        fetchProfile();
        resetAllFormik();

        MyToast.fire({
          icon: 'success',
          title: message,
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
      .finally(() => setLoad(false));
  };

  const delUser = async () => {
    await api
      .delUserById(ckToken)
      .then((response) => {
        const { message } = response.data;

        removeCookie('role');
        removeCookie('avatar');
        removeCookie('id');
        removeCookie('token');
        navigate('/landing');

        MyToast.fire({
          icon: 'success',
          title: message,
        });
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      });
  };

  const handleDelUser = async () => {
    MySwal.fire({
      icon: 'question',
      title: 'Hapus Akun',
      text: `Apakah Anda yakin ingin menghapus akun anda?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        delUser();
      }
    });
  };

  const resetAllFormik = () => {
    formikFullname.resetForm();
    formikEmail.resetForm();
    formikPhone.resetForm();
    formikBank.resetForm();
    formikAccountNumber.resetForm();
    formikAddress.resetForm();
    formikPassword.resetForm();
    formikAvatar.resetForm();
    setPreview(null);
  };

  //FORMIK

  const formikFullname = useFormik({
    initialValues: {
      fullname: '',
    },
    validationSchema: schemaFullname,
    onSubmit: async (values) => {
      await putUsers(values);
    },
  });
  const formikEmail = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: schemaEmail,
    onSubmit: async (values) => {
      await putUsers(values);
    },
  });
  const formikPhone = useFormik({
    initialValues: {
      phone: '',
    },
    validationSchema: schemaPhone,
    onSubmit: async (values) => {
      values.phone = values.phone.toString();
      await putUsers(values);
    },
  });
  const formikBank = useFormik({
    initialValues: {
      bank: '',
    },
    validationSchema: schemaBank,
    onSubmit: async (values) => {
      await putUsers(values);
    },
  });
  const formikAddress = useFormik({
    initialValues: {
      address: '',
    },
    validationSchema: schemaAddress,
    onSubmit: async (values) => {
      await putUsers(values);
    },
  });
  const formikAccountNumber = useFormik({
    initialValues: {
      accountNumber: '',
    },
    validationSchema: schemaRekening,
    onSubmit: async (values) => {
      values.accountNumber = values.accountNumber.toString();
      await putUsers(values);
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
      putUsers(values);
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
    await putUsers(formData);
  };

  useEffect(() => {
    fetchProfile();
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
                  value={dataProfile?.fullname}
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
                  value={dataProfile?.email}
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
                  value={dataProfile?.phone}
                  disabled={true}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className=" self-start">Nomor telepon baru:</p>{' '}
                <Input
                  id="phone"
                  name="phone"
                  label="Telepon baru anda"
                  type="number"
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
                  value={dataProfile?.address}
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
              onSubmit={formikAccountNumber.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Edit Rekening
              </p>
              <div className="flex flex-col w-full">
                <p className=" self-start">Rekening Lama:</p>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  type="number"
                  value={dataProfile?.accountNumber}
                  disabled={true}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className=" self-start">Rekening baru:</p>{' '}
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  label="Rekening baru anda"
                  type="number"
                  value={formikAccountNumber.values.accountNumber}
                  onChange={formikAccountNumber.handleChange}
                  onBlur={formikAccountNumber.handleBlur}
                  error={formikAccountNumber.errors.accountNumber}
                  touch={formikAccountNumber.touched.accountNumber}
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
                  value={dataProfile?.bank}
                  disabled={true}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className=" self-start">Bank Baru:</p>{' '}
                <Select
                  id="bank"
                  name="bank"
                  label="Pilih Bank"
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
                <p className=" self-start">Password Baru:</p>{' '}
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
                  <div className="grid grid-cols-[100px_minmax(0,_1fr)] gap-2 mb-8 max-w-max">
                    <p className="text-xl col-span-1 ">Nama</p>
                    <p className="text-xl col-span-1">
                      <span className="font-semibold">
                        {dataProfile?.fullname}
                      </span>{' '}
                      &ensp;
                      <label
                        htmlFor="modal-edit-fullname"
                        className="text-primary text-base font-medium cursor-pointer hover:text-primary-focus"
                      >
                        Ubah
                      </label>
                    </p>

                    <p className="text-xl col-span-1">Email</p>
                    <p className="text-xl col-span-1">
                      <span className="font-semibold">
                        {dataProfile?.email}
                      </span>{' '}
                      &ensp;
                      <label
                        htmlFor="modal-edit-email"
                        className="text-primary text-base font-medium cursor-pointer hover:text-primary-focus"
                      >
                        Ubah
                      </label>
                    </p>

                    <p className="text-xl col-span-1">Telepon</p>
                    <p className="text-xl col-span-1">
                      <span className="font-semibold">
                        {dataProfile?.phone}
                      </span>{' '}
                      &ensp;
                      <label
                        htmlFor="modal-edit-phone"
                        className="text-primary text-base font-medium cursor-pointer hover:text-primary-focus"
                      >
                        Ubah
                      </label>
                    </p>

                    <p className="text-xl col-span-1">Alamat</p>
                    <p className="text-xl col-span-1">
                      <span className="font-semibold">
                        {dataProfile?.address}
                      </span>{' '}
                      &ensp;
                      <label
                        htmlFor="modal-edit-address"
                        className="text-primary text-base font-medium cursor-pointer hover:text-primary-focus"
                      >
                        Ubah
                      </label>
                    </p>

                    <p className="text-xl col-span-1">Rekening</p>
                    <p className="text-xl col-span-1">
                      {dataProfile?.accountNumber ? (
                        <>
                          <span className="font-semibold">
                            {dataProfile.accountNumber}
                          </span>
                          &ensp;
                          <label
                            htmlFor="modal-edit-rekening"
                            className="text-primary text-base font-medium cursor-pointer hover:text-primary-focus"
                          >
                            Ubah
                          </label>
                        </>
                      ) : (
                        <>
                          <label
                            htmlFor="modal-edit-rekening"
                            className="text-primary text-base font-medium cursor-pointer hover:text-primary-focus"
                          >
                            Tambahkan rekening
                          </label>{' '}
                        </>
                      )}
                    </p>

                    <p className="text-xl col-span-1">Bank</p>
                    <p className="text-xl col-span-1">
                      {dataProfile?.bank ? (
                        <>
                          <span className="font-semibold uppercase">
                            {dataProfile.bank}
                          </span>
                          &ensp;
                          <label
                            htmlFor="modal-edit-bank"
                            className="text-primary text-base font-medium cursor-pointer hover:text-primary-focus"
                          >
                            Ubah
                          </label>
                        </>
                      ) : (
                        <>
                          <label
                            htmlFor="modal-edit-bank"
                            className="text-primary text-base font-medium cursor-pointer hover:text-primary-focus"
                          >
                            Tambahkan bank
                          </label>{' '}
                        </>
                      )}
                    </p>
                  </div>

                  <div className="flex w-full pt-5 gap-4">
                    <label
                      htmlFor="modal-edit-password"
                      className="btn btn-primary w-36 text-primary-content"
                    >
                      Ganti Password
                    </label>

                    <button
                      className="btn btn-error w-36 text-error-content"
                      disabled={ckRole === 'admin'}
                      onClick={() => handleDelUser()}
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
