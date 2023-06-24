import Layout from '../components/Layout';
import { Suspense, lazy, useState } from 'react';
import { schedules as dummyData } from '../json/dummyJadwal.json';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import imgBwh from '../assets/hero_unsplash_3.png';
import { FaArrowRight, FaPen, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modals } from '../components/Modals';
import { Input, InputFile, TextArea } from '../components/Input';

const CardHome = lazy(() => import('../components/CardHome'));

const schemaAddPlant = Yup.object().shape({
  name: Yup.string().required('Required'),
});

function JadwalTanam() {
  const [cookie] = useCookies(['role']);
  const ckRole = cookie.role;
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  const formikAddPlant = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schemaAddPlant,
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
                    <th className="w-[10%]"></th>
                    <th className="w-[60%]">Nama Tanaman</th>
                    <th className="w-[15%]">Edit</th>
                    <th className="w-[15%]">Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.map((prop, idx) => {
                    return (
                      <tr key={idx}>
                        <th>{idx + 1}</th>
                        <td>{prop.scheduleName}</td>
                        <td>
                          <button
                            onClick={() =>
                              navigate(`/jadwaltanam/${prop.scheduleId}`)
                            }
                            className="btn p-0 min-h-0 h-0 p text-base"
                          >
                            <FaPen />
                          </button>
                        </td>
                        <td>
                          <button className="btn p-0 min-h-0 h-0 p text-base">
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
    </Layout>
  );
}

export default JadwalTanam;
