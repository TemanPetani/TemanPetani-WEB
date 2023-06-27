import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modals } from '../components/Modals';
import { Input } from '../components/Input';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { GetTasks } from '../utils/type';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import swal from '../utils/swal';
import toast from '../utils/toast';
import withReactContent from 'sweetalert2-react-content';
import LoadingFull from '../components/LoadingFull';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

const schemaAddTask = Yup.object().shape({
  name: Yup.string().required('Required'),
  startDays: Yup.string().required('Required'),
});

function TasksJadwalTanam() {
  const [dataTasks, setDataTasks] = useState<GetTasks>();
  const [load, setLoad] = useState<boolean>(false);
  const [loadPost, setLoadPost] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState<string>();

  const { schedule_id } = useParams();

  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);

  const [cookie] = useCookies(['role', 'token']);
  const ckToken = cookie.token;

  const handleModalEdit = (name?: string, startDays?: number, id?: number) => {
    formikEditTasks.setFieldValue('name', name);
    formikEditTasks.setFieldValue('startDays', startDays);
    setIdEdit(id?.toString());
  };

  const fetchTasksJadwalTanam = async () => {
    setLoad(true);
    await api
      .getTemplatesById(ckToken, schedule_id)
      .then(async (response) => {
        const { data } = response.data;

        await setDataTasks(data);
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

  const postTasks = async (datad?: object) => {
    setLoadPost(true);
    await api
      .postTasks(ckToken, schedule_id, datad)
      .then((response) => {
        const { message } = response.data;
        MySwal.fire({
          text: message,
          icon: 'success',
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            fetchTasksJadwalTanam();
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
      .putTasks(ckToken, idEdit, datad)
      .then((response) => {
        const { message } = response.data;

        MyToast.fire({
          icon: 'success',
          title: message,
        });
        fetchTasksJadwalTanam();
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

  const delTasks = async (id?: string) => {
    await api
      .delTasks(ckToken, id)
      .then((response) => {
        const { message } = response.data;
        MyToast.fire({
          icon: 'success',
          title: message,
        });
        fetchTasksJadwalTanam();
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

  const handleDelTasks = async (name?: string, id?: number) => {
    MySwal.fire({
      icon: 'question',
      title: 'Hapus Jadwal',
      text: `ingin menghapus ${name}`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        delTasks(id?.toString());
      }
    });
  };

  const formikAddTasks = useFormik({
    initialValues: {
      name: '',
      startDays: '',
    },
    validationSchema: schemaAddTask,
    onSubmit: async (values) => {
      postTasks(values);
    },
  });

  const formikEditTasks = useFormik({
    initialValues: {
      name: '',
      startDays: '',
    },
    validationSchema: schemaAddTask,
    onSubmit: async (values) => {
      putTemplates(values);
    },
  });

  useEffect(() => {
    fetchTasksJadwalTanam();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      {load ? (
        <LoadingFull />
      ) : (
        <>
          <Modals id="modal-add-tasks">
            <form
              onSubmit={formikAddTasks.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Tambah Aktivitas
              </p>
              <div className="w-full flex flex-col  justify-center items-cente gap-3">
                <div className="flex flex-col w-full">
                  <p className=" self-start">Nama Aktivitas:</p>{' '}
                  <Input
                    id="name"
                    name="name"
                    label="Nama Aktivitas"
                    type="text"
                    value={formikAddTasks.values.name}
                    onChange={formikAddTasks.handleChange}
                    onBlur={formikAddTasks.handleBlur}
                    error={formikAddTasks.errors.name}
                    touch={formikAddTasks.touched.name}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className=" self-start">Aktivitas pada hari ke:</p>{' '}
                  <Input
                    id="startDays"
                    name="startDays"
                    label="+ hari setelah mulai"
                    type="number"
                    value={formikAddTasks.values.startDays}
                    onChange={formikAddTasks.handleChange}
                    onBlur={formikAddTasks.handleBlur}
                    error={formikAddTasks.errors.startDays}
                    touch={formikAddTasks.touched.startDays}
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
                        htmlFor="modal-add-tasks"
                        className="btn btn-ghost"
                      >
                        Kembali
                      </label>
                      <button
                        id="btn-submit-tasks"
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
          <Modals id="modal-edit-tasks">
            <form
              onSubmit={formikEditTasks.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Tambah Aktivitas
              </p>
              <div className="w-full flex flex-col  justify-center items-cente gap-3">
                <div className="flex flex-col w-full">
                  <p className=" self-start">Nama Aktivitas:</p>{' '}
                  <Input
                    id="name"
                    name="name"
                    label="Nama Aktivitas"
                    type="text"
                    value={formikEditTasks.values.name}
                    onChange={formikEditTasks.handleChange}
                    onBlur={formikEditTasks.handleBlur}
                    error={formikEditTasks.errors.name}
                    touch={formikEditTasks.touched.name}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className=" self-start">Aktivitas pada hari ke:</p>{' '}
                  <Input
                    id="startDays"
                    name="startDays"
                    label="+ hari setelah mulai"
                    type="number"
                    value={formikEditTasks.values.startDays}
                    onChange={formikEditTasks.handleChange}
                    onBlur={formikEditTasks.handleBlur}
                    error={formikEditTasks.errors.startDays}
                    touch={formikEditTasks.touched.startDays}
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
                        htmlFor="modal-edit-tasks"
                        className="btn btn-ghost"
                      >
                        Kembali
                      </label>
                      <button
                        id="btn-submit-tasks"
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
                <p className="text-2xl uppercase font-semibold tracking-wider mb-8 self-start">
                  Detail Jadwal : <br />
                  {dataTasks?.name}
                </p>
                <label
                  htmlFor="modal-add-tasks"
                  className="btn btn-primary btn-wide"
                >
                  Tambah Aktivitas
                </label>
              </div>
              <div className="w-3/4 h-full">
                <div className="overflow-x-auto w-full">
                  <table className="table bg-base-100">
                    <thead>
                      <tr>
                        <th className="w-[5%]"></th>
                        <th className="w-[60%]">Nama Aktivitas</th>
                        <th className="w-[15%]">Waktu Aktivitas</th>
                        <th className="w-[10%]">Ubah</th>
                        <th className="w-[10%]">Hapus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTasks?.tasks.map((prop, idx) => {
                        return (
                          <tr key={idx}>
                            <th>{idx + 1}</th>
                            <td>{prop.name}</td>
                            <td>+ {prop.startDays} hari</td>
                            <td>
                              <label
                                htmlFor="modal-edit-tasks"
                                onClick={() =>
                                  handleModalEdit(
                                    prop.name,
                                    prop.startDays,
                                    prop.id
                                  )
                                }
                                className="btn p-0 min-h-0 h-0 p text-base"
                              >
                                <FaPen />
                              </label>
                            </td>
                            <td>
                              <button
                                onClick={() =>
                                  handleDelTasks(prop.name, prop.id)
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

export default TasksJadwalTanam;
