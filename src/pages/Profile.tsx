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

const Profile = () => {
  const [dataProfile, setDataProfile] = useState<getUsers>();
  const [load, setLoad] = useState<boolean>(false);

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

  useEffect(() => {
    // fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      {load ? (
        <LoadingFull />
      ) : (
        <Layout
          chose="section"
          addClass="bg-base-100 flex py-12 justify-center px-20"
        >
          <div className="flex">
            <div className="flex md:flex-row flex-col items-center justify-center gap-10">
              <div className="card w-fit h-fit pb-5">
                <div className="p-1 bg-slate-300 rounded-full relative">
                  <img
                    src={dataProfile?.avatar ? dataProfile?.avatar : placeImage}
                    alt={`User's profile picture`}
                    className="h-80 w-80 border-spacing-1 rounded-full object-cover object-center"
                  />
                  <div className="bottom-7 right-7 absolute">
                    <button className="btn btn-primary btn-circle p-3 text-lg">
                      <FaEdit />
                    </button>
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
                    <label className="link link-primary">edit</label>
                  </p>
                  <p className="text-xl">
                    Email:{' '}
                    <span className="font-semibold">
                      {' '}
                      {dataProfil.user.email}
                    </span>{' '}
                    &emsp;
                    <label className="link link-primary">edit</label>
                  </p>
                  <p className="text-xl">
                    Telepon:{' '}
                    <span className="font-semibold">
                      {' '}
                      {dataProfil.user.phone}
                    </span>{' '}
                    &emsp;
                    <label className="link link-primary">edit</label>
                  </p>
                  <p className="text-xl">
                    Alamat:{' '}
                    <span className="font-semibold">
                      {' '}
                      {dataProfil.user.address}
                    </span>{' '}
                    &emsp;
                    <label className="link link-primary">edit</label>
                  </p>
                  <p className="text-xl">
                    Rekening:{' '}
                    <span className="font-semibold">
                      {' '}
                      {dataProfil.user.noRekening}
                    </span>{' '}
                    &emsp;
                    <label className="link link-primary">edit</label>
                  </p>
                  <p className="text-xl">
                    Bank:{' '}
                    <span className="font-semibold uppercase">
                      {' '}
                      {dataProfil.user.bank}
                    </span>{' '}
                    &emsp;
                    <label className="link link-primary">edit</label>
                  </p>
                </div>
                <div className="flex w-full pt-5 gap-4">
                  <button className="btn btn-primary w-36 text-white">
                    Ganti Password
                  </button>

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
      )}
    </Layout>
  );
};
export default Profile;
