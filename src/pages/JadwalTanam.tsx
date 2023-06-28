import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaPen, FaTrashAlt } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modals } from '../components/Modals';
import { Input } from '../components/Input';
import { useEffect, useState } from 'react';
import { GetTemplates } from '../utils/type';
import api from '../utils/api';
import { useCookies } from 'react-cookie';
import swal from '../utils/swal';
import withReactContent from 'sweetalert2-react-content';
import LoadingFull from '../components/LoadingFull';
import toast from '../utils/toast';

const schemaAddPlant = Yup.object().shape({
  name: Yup.string().required('Required'),
});

function JadwalTanam() {
  const [dataTemplates, setDataTemplates] = useState<GetTemplates[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState<string>();
  const [loadPost, setLoadPost] = useState<boolean>(false);

  const [cookie, , removeCookie] = useCookies(['role', 'token']);
  const ckToken = cookie.token;

  const navigate = useNavigate();
  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);

  const formikAddPlant = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schemaAddPlant,
    onSubmit: async (values) => {
      postTemplates(values);
    },
  });
  const formikEditPlant = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schemaAddPlant,
    onSubmit: async (values) => {
      putTemplates(values);
    },
  });

  const handleModalEdit = (name?: string, id?: number) => {
    formikEditPlant.setFieldValue('name', name);
    setIdEdit(id?.toString());
  };

  const fetchJadwalTanam = async () => {
    setLoad(true);
    await api
      .getAllTemplates(ckToken)
      .then(async (response) => {
        const { data } = response.data;
        await setDataTemplates(data);
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

  const postTemplates = async (datad?: object) => {
    setLoadPost(true);
    await api
      .postTemplates(ckToken, datad)
      .then((response) => {
        const { message } = response.data;
        MySwal.fire({
          text: message,
          icon: 'success',
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            fetchJadwalTanam();
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
      .finally(() => setLoadPost(false));
  };

  const putTemplates = async (datad?: object) => {
    setLoadPost(true);
    await api
      .putTemplates(ckToken, idEdit, datad)
      .then((response) => {
        const { message } = response.data;

        MyToast.fire({
          icon: 'success',
          title: message,
        });
        fetchJadwalTanam();
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
      .finally(() => setLoadPost(false));
  };

  const delTemplates = async (id?: string) => {
    await api
      .delTemplates(ckToken, id)
      .then((response) => {
        const { message } = response.data;
        MyToast.fire({
          icon: 'success',
          title: message,
        });
        fetchJadwalTanam();
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

  const handleDelUser = async (name?: string, id?: number) => {
    MySwal.fire({
      icon: 'question',
      title: 'Hapus Jadwal',
      text: `ingin menghapus ${name}`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        delTemplates(id?.toString());
      }
    });
  };

  useEffect(() => {
    fetchJadwalTanam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      {load ? (
        <LoadingFull />
      ) : (
        <>
          <Modals id="modal-add-plant">
            <form
              onSubmit={formikAddPlant.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Tambah Jadwal
              </p>
              <div className="w-full flex md:flex-row flex-col  justify-center items-cente gap-3">
                <div className="flex flex-col w-full">
                  <p className=" self-start">Nama Tanaman:</p>{' '}
                  <Input
                    id="name"
                    name="name"
                    label="Nama Tanaman"
                    type="text"
                    value={formikAddPlant.values.name}
                    onChange={formikAddPlant.handleChange}
                    onBlur={formikAddPlant.handleBlur}
                    error={formikAddPlant.errors.name}
                    touch={formikAddPlant.touched.name}
                  />
                </div>
              </div>

              <div className="w-full flex justify-end gap-3">
                <div className="modal-action mt-0 ">
                  {loadPost === true ? (
                    <button
                      id="login-button-loading"
                      className="btn btn-primary mt-3 w-32 text-white "
                      type="button"
                    >
                      <span className="loading loading-spinner"></span>
                    </button>
                  ) : (
                    <>
                      <label
                        htmlFor="modal-add-plant"
                        className="btn btn-ghost"
                      >
                        Kembali
                      </label>
                      <button
                        id="btn-submit-plant"
                        type="submit"
                        className="btn btn-primary w-32 text-white"
                      >
                        Simpan
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </Modals>
          <Modals id="modal-edit-plant">
            <form
              onSubmit={formikEditPlant.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Ubah Nama Jadwal
              </p>
              <div className="w-full flex md:flex-row flex-col  justify-center items-cente gap-3">
                <div className="flex flex-col w-full">
                  <p className=" self-start">Nama Tanaman:</p>{' '}
                  <Input
                    id="name"
                    name="name"
                    label="Nama Tanaman"
                    type="text"
                    value={formikEditPlant.values.name}
                    onChange={formikEditPlant.handleChange}
                    onBlur={formikEditPlant.handleBlur}
                    error={formikEditPlant.errors.name}
                    touch={formikEditPlant.touched.name}
                  />
                </div>
              </div>

              <div className="w-full flex justify-end gap-3">
                <div className="modal-action mt-0 ">
                  {loadPost === true ? (
                    <button
                      id="login-button-loading"
                      className="btn btn-primary mt-3 w-32 text-white "
                      type="button"
                    >
                      <span className="loading loading-spinner"></span>
                    </button>
                  ) : (
                    <>
                      <label
                        htmlFor="modal-edit-plant"
                        className="btn btn-ghost"
                      >
                        Kembali
                      </label>
                      <button
                        id="btn-submit-plant"
                        type="submit"
                        className="btn btn-primary w-32 text-white"
                      >
                        Simpan
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </Modals>
          <Layout
            chose="section"
            addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-8 md:py-16 flex  items-start "
          >
            <div className="w-full h-max flex flex-col justify-center items-center pt-8">
              <div className="flex w-3/4 justify-between">
                <p className="text-2xl uppercase lg:text-4xl font-semibold tracking-wider mb-8 self-start">
                  Jadwal Tanam
                </p>
                <label
                  htmlFor="modal-add-plant"
                  className="btn btn-primary btn-wide"
                >
                  Tambah Jadwal
                </label>
              </div>
              <div className="w-3/4 h-full">
                <div className="overflow-x-auto w-full">
                  <table className="table bg-base-100">
                    <thead>
                      <tr>
                        <th className="w-[5%]"></th>
                        <th className="w-[65%]">Nama Tanaman</th>
                        <th className="w-[10%]">Detail</th>
                        <th className="w-[10%]">Ubah</th>
                        <th className="w-[10%]">Hapus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTemplates.map((prop, idx) => {
                        return (
                          <tr key={idx}>
                            <th>{idx + 1}</th>
                            <td>{prop.name}</td>
                            <td>
                              <button
                                onClick={() =>
                                  navigate(`/plant_templates/${prop.id}`)
                                }
                                className="btn p-0 min-h-0 h-0 p text-base"
                              >
                                <FaClipboardList />
                              </button>
                            </td>
                            <td>
                              <label
                                htmlFor="modal-edit-plant"
                                onClick={() =>
                                  handleModalEdit(prop.name, prop.id)
                                }
                                className="btn p-0 min-h-0 h-0 p text-base"
                              >
                                <FaPen />
                              </label>
                            </td>
                            <td>
                              <button
                                onClick={() =>
                                  handleDelUser(prop.name, prop.id)
                                }
                                className="btn p-0 min-h-0 h-0 p text-base"
                              >
                                <FaTrashAlt />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Layout>
        </>
      )}
    </Layout>
  );
}

export default JadwalTanam;
