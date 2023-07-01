import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Select } from '../components/Input';
import api from '../utils/api';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { GetTemplates } from '../utils/type';
import swal from '../utils/swal';
import withReactContent from 'sweetalert2-react-content';
import LoadingFull from '../components/LoadingFull';

const schemaTanam = Yup.object().shape({
  name: Yup.string().required('Required'),
  templateId: Yup.string().required('Required'),
  startDate: Yup.date()
    // .min(
    //   new Date(new Date().setDate(new Date().getDate() - 1)),
    //   'Start date cannot be before today'
    // )
    .required('Start date is required'),
});

function Tanam() {
  const [dataTemplates, setDataTemplates] = useState<GetTemplates[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [loadPost, setLoadPost] = useState<boolean>(false);

  const [cookie, , removeCookie] = useCookies(['role', 'token']);
  const ckToken = cookie.token;

  const navigate = useNavigate();
  const MySwal = withReactContent(swal);

  const formikTanam = useFormik({
    initialValues: {
      name: '',
      templateId: '',
      startDate: '',
    },
    validationSchema: schemaTanam,
    onSubmit: async (values) => {
      const check = {
        name: values.name,
        templateId: parseInt(values.templateId),
        startDate: `${values.startDate}T00:00:00Z`,
      };
      await postPlant(check);
    },
  });

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

  const postPlant = async (datad?: object) => {
    setLoadPost(true);
    await api
      .postPlant(ckToken, datad)
      .then((response) => {
        const { message } = response.data;
        MySwal.fire({
          text: message,
          icon: 'success',
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/myplant');
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

  useEffect(() => {
    fetchJadwalTanam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      {load ? (
        <LoadingFull />
      ) : (
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
                  <p className=" self-start">templateId Tanaman:</p>{' '}
                  <Select
                    id="templateId"
                    name="templateId"
                    label="templateId Tanaman anda"
                    value={formikTanam.values.templateId}
                    onChangeSelect={formikTanam.handleChange}
                    onBlur={formikTanam.handleBlur}
                    error={formikTanam.errors.templateId}
                    touch={formikTanam.touched.templateId}
                  >
                    {dataTemplates.map((opt) => (
                      <option
                        key={opt.id}
                        value={opt.id}
                      >
                        {opt.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-col w-full">
                  <p className=" self-start">Tanggal Mulai:</p>{' '}
                  <Input
                    id="startDate"
                    name="startDate"
                    label="taanggal mulai menanam"
                    type="date"
                    value={formikTanam.values.startDate}
                    onChange={formikTanam.handleChange}
                    onBlur={formikTanam.handleBlur}
                    error={formikTanam.errors.startDate}
                    touch={formikTanam.touched.startDate}
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
                      <button
                        onClick={() => navigate('/')}
                        className="btn btn-ghost"
                        id="btn-back"
                      >
                        Kembali
                      </button>
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
          </div>
        </Layout>
      )}
    </Layout>
  );
}

export default Tanam;
