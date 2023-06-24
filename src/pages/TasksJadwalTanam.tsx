import Layout from '../components/Layout';
import { Suspense, lazy, useState } from 'react';
import { data as dummyData } from '../json/dummyDetailAktivitas.json';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import imgBwh from '../assets/hero_unsplash_3.png';
import { FaArrowRight, FaPen, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modals } from '../components/Modals';
import { Input, InputFile, TextArea } from '../components/Input';

const CardHome = lazy(() => import('../components/CardHome'));

const schemaAddTask = Yup.object().shape({
  tasksName: Yup.string().required('Required'),
  duration: Yup.string().required('Required'),
});

function TasksJadwalTanam() {
  const [cookie] = useCookies(['role']);
  const ckRole = cookie.role;
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  const formikAddTasks = useFormik({
    initialValues: {
      tasksName: '',
      duration: '',
    },
    validationSchema: schemaAddTask,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const formDataToPost = async (datad?: any) => {
    const formData = new FormData();
    formData.append('productId', datad.productId);
    formData.append('description', datad.description);
    formData.append('address', datad.address);
    formData.append('price', datad.price);
    formData.append('homestay_picture', datad.homestay_picture);
    await console.log(formData);
  };

  return (
    <Layout chose="layout">
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
                id="tasksName"
                name="tasksName"
                label="Nama Aktivitas"
                type="text"
                value={formikAddTasks.values.tasksName}
                onChange={formikAddTasks.handleChange}
                onBlur={formikAddTasks.handleBlur}
                error={formikAddTasks.errors.tasksName}
                touch={formikAddTasks.touched.tasksName}
              />
            </div>
            <div className="flex flex-col w-full">
              <p className=" self-start">Durasi Aktivitas:</p>{' '}
              <Input
                id="duration"
                name="duration"
                label="Durasi Aktivitas (hari)"
                type="number"
                value={formikAddTasks.values.duration}
                onChange={formikAddTasks.handleChange}
                onBlur={formikAddTasks.handleBlur}
                error={formikAddTasks.errors.duration}
                touch={formikAddTasks.touched.duration}
              />
            </div>
          </div>

          <div className="w-full flex justify-end gap-3">
            <div className="modal-action mt-0 ">
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
            </div>
          </div>
        </form>
      </Modals>
      <Layout
        chose="section"
        addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-8 md:py-16 flex  items-center "
      >
        <div className="w-full h-max flex flex-col justify-center items-center pt-8">
          <div className="flex w-3/4 justify-between">
            <p className="text-2xl uppercase font-semibold tracking-wider mb-8 self-start">
              Detail Jadwal : <br />
              {dummyData.name}
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
                    <th className="w-[10%]"></th>
                    <th className="w-[60%]">Nama Aktivitas</th>
                    <th className="w-[30%]">Waktu Aktivitas</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.step.map((prop, idx) => {
                    return (
                      <tr key={idx}>
                        <th>{idx + 1}</th>
                        <td>{prop.tasks}</td>
                        <td>+ {prop.duration} hari setelah tanam</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  );
}

export default TasksJadwalTanam;
