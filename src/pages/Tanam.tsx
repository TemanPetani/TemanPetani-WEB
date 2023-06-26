import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Select } from '../components/Input';

const schemaTanam = Yup.object().shape({
  name: Yup.string().required('Required'),
  jenis: Yup.string().required('Required'),
  start_date: Yup.date()
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      'Start date cannot be before today'
    )
    .required('Start date is required'),
});

function Tanam() {
  const navigate = useNavigate();

  const formikTanam = useFormik({
    initialValues: {
      name: '',
      jenis: '',
      start_date: '',
    },
    validationSchema: schemaTanam,
    onSubmit: async (values) => {
      const check = {
        name: values.name,
        jenis: values.jenis,
        start_date: `${values.start_date}T00:00:00Z`,
      };
      await console.log(check);
    },
  });

  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-8 md:py-16 flex "
      >
        <div className="w-full h-max flex flex-col items-center pt-8">
          <form
            onSubmit={formikTanam.handleSubmit}
            className="flex flex-col gap-3 items-center w-3/4"
          >
            <p className="text-2xl uppercase lg:text-4xl font-semibold tracking-wider self-start">
              Mulai Menanam!
            </p>
            <div className="w-full flex flex-col  justify-center items-cente gap-3">
              <div className="flex flex-col w-full">
                <p className=" self-start">Nama Tanaman:</p>{' '}
                <Input
                  id="name"
                  name="name"
                  label="Nama Tanaman anda"
                  type="text"
                  value={formikTanam.values.name}
                  onChange={formikTanam.handleChange}
                  onBlur={formikTanam.handleBlur}
                  error={formikTanam.errors.name}
                  touch={formikTanam.touched.name}
                />
              </div>
              <div className="flex flex-col w-full">
                <p className=" self-start">Jenis Tanaman:</p>{' '}
                <Select
                  id="jenis"
                  name="jenis"
                  label="Jenis Tanaman anda"
                  value={formikTanam.values.jenis}
                  onChangeSelect={formikTanam.handleChange}
                  onBlur={formikTanam.handleBlur}
                  error={formikTanam.errors.jenis}
                  touch={formikTanam.touched.jenis}
                >
                  <option value="jagung">Jagung</option>
                  <option value="padi">Padi</option>
                  <option value="bawang">Bawang</option>
                </Select>
              </div>
              <div className="flex flex-col w-full">
                <p className=" self-start">Tanggal Mulai:</p>{' '}
                <Input
                  id="start_date"
                  name="start_date"
                  label="taanggal mulai menanam"
                  type="date"
                  value={formikTanam.values.start_date}
                  onChange={formikTanam.handleChange}
                  onBlur={formikTanam.handleBlur}
                  error={formikTanam.errors.start_date}
                  touch={formikTanam.touched.start_date}
                />
              </div>
            </div>

            <div className="w-full flex justify-end gap-3">
              <div className="modal-action mt-0 ">
                <button
                  onClick={() => navigate('/')}
                  className="btn btn-ghost"
                >
                  Kembali
                </button>
                <button
                  id="btn-submit-tnam"
                  type="submit"
                  className="btn btn-primary w-32 text-white"
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </Layout>
  );
}

export default Tanam;
