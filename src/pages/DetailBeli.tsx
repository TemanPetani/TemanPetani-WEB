import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import imgBwh from '../assets/polaceholder_image.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modals } from '../components/Modals';
import { Input, Select, TextArea } from '../components/Input';
import { getAllProduct } from '../utils/type';
import { useCookies } from 'react-cookie';
import api from '../utils/api';
import swal from '../utils/swal';
import withReactContent from 'sweetalert2-react-content';
import LoadingFull from '../components/LoadingFull';

const schemaConfirm = Yup.object().shape({
  bank: Yup.string().required('Required'),
  catatan: Yup.string().required('Required'),
  quantity: Yup.number().required('Required'),
});

const schemaTawar = Yup.object().shape({
  nego: Yup.string().required('Required'),
  quantity: Yup.string().required('Required'),
});

function DetailBeli() {
  const { type, productId } = useParams();
  const [load, setLoad] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<getAllProduct>();
  const navigate = useNavigate();

  const MySwal = withReactContent(swal);
  const [cookie, , removeCookie] = useCookies(['token', 'role', 'avatar']);
  const ckToken = cookie.token;

  const formikConfirm = useFormik({
    initialValues: {
      bank: '',
      catatan: '',
      quantity: '',
    },
    validationSchema: schemaConfirm,
    onSubmit: async () => {
      // console.log(values);
    },
  });
  const formikTawar = useFormik({
    initialValues: {
      nego: '',
      quantity: '',
    },
    validationSchema: schemaTawar,
    onSubmit: async () => {
      // console.log(values);
    },
  });

  const fetchProduct = async () => {
    setLoad(true);
    await api
      .getProductId(ckToken, productId)
      .then(async (response) => {
        const { data } = response.data;
        await setDataDetail(data.product);
        formikTawar.setFieldValue('nego', data.product.price);
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
            removeCookie('avatar');
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

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      {load ? (
        <LoadingFull />
      ) : (
        <>
          <Modals id="modal-buy">
            <form
              onSubmit={formikConfirm.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Detail Pembelian
              </p>
              <p className="text-base self-start">
                Nama: <span className="font-semibold">{dataDetail?.name}</span>{' '}
              </p>
              <p className="text-base self-start">
                Harga:{' '}
                <span className="font-semibold">{dataDetail?.price}</span>{' '}
              </p>
              <div className="flex flex-col w-full">
                <p className=" self-start">Pilih Bank:</p>{' '}
                <Select
                  id="bank"
                  name="bank"
                  label="Pilih Bank"
                  value={formikConfirm.values.bank}
                  onChangeSelect={formikConfirm.handleChange}
                  onBlur={formikConfirm.handleBlur}
                  error={formikConfirm.errors.bank}
                  touch={formikConfirm.touched.bank}
                >
                  <option value="bri">BRI</option>
                  <option value="bca">BCA</option>
                  <option value="bni">BNI</option>
                </Select>
              </div>
              <div className="flex flex-col w-full">
                <p className=" self-start">Jumlah:</p>{' '}
                <Input
                  id="quantity"
                  name="quantity"
                  label="stok produk anda"
                  type="number"
                  value={formikConfirm.values.quantity}
                  onChange={formikConfirm.handleChange}
                  onBlur={formikConfirm.handleBlur}
                  error={formikConfirm.errors.quantity}
                  touch={formikConfirm.touched.quantity}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className=" self-start">catatan:</p>{' '}
                <TextArea
                  id="catatan"
                  name="catatan"
                  label="Deskripsi Produk anda"
                  value={formikConfirm.values.catatan}
                  onChange={formikConfirm.handleChange}
                  onBlur={formikConfirm.handleBlur}
                  error={formikConfirm.errors.catatan}
                  touch={formikConfirm.touched.catatan}
                />
              </div>

              <div className="w-full flex justify-end gap-3">
                <div className="modal-action mt-0 ">
                  <label
                    htmlFor="modal-buy"
                    className="btn btn-ghost"
                  >
                    Kembali
                  </label>
                  <button
                    id="btn-submit-add"
                    type="submit"
                    className="btn btn-primary w-32 text-white"
                  >
                    Konfirmasi
                  </button>
                </div>
              </div>
            </form>
          </Modals>

          {type === 'equip' ? (
            <Layout
              chose="section"
              addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-16  flex items-center "
            >
              <div className="w-full h-full flex md:flex-row flex-col justify-center items-center pt-8 ">
                <div className="basis-full  md:basis-1/2 flex justify-end   mb-7 md:mr-7">
                  <div className="bg-slate-500 h-max rounded-2xl drop-shadow-md">
                    <img
                      src={dataDetail?.imageUrl ? dataDetail?.imageUrl : imgBwh}
                      alt="gabung"
                      className="object-cover object-center rounded-2xl h-full w-full md:h-80 md:w-80 lg:h-[28rem] lg:w-[28rem]"
                    />
                  </div>
                </div>

                <div className="basis-full md:basis-1/2  flex flex-col gap-4 p-3 h-full md:h-80  lg:h-[28rem] justify-between">
                  <div className="">
                    <p className="text-3xl font-bold tracking-wider ">
                      {dataDetail?.name}{' '}
                    </p>
                    <p className="text-xl my-5">{dataDetail?.description}</p>
                    <p className="text-xl">
                      Harga:{' '}
                      <span className="font-semibold">{dataDetail?.price}</span>{' '}
                    </p>
                    <p className="text-xl">
                      Stok:{' '}
                      <span className="font-semibold">{dataDetail?.stock}</span>{' '}
                      Unit
                    </p>
                  </div>

                  <label
                    id="button-to-beli"
                    htmlFor="modal-buy"
                    className="btn btn-primary text-base text-primary-content w-max self-end"
                  >
                    Beli Sekarang
                  </label>
                </div>
              </div>
            </Layout>
          ) : (
            <Layout
              chose="section"
              addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-16  flex items-center "
            >
              <div className="w-full h-full flex md:flex-row flex-col justify-center items-center pt-8 ">
                <div className="basis-full  md:basis-1/2 flex justify-end   mb-7 md:mr-7">
                  <div className="bg-slate-500 h-max rounded-2xl drop-shadow-md">
                    <img
                      src={dataDetail?.imageUrl ? dataDetail?.imageUrl : imgBwh}
                      alt="gabung"
                      className="object-cover object-center rounded-2xl h-full w-full md:h-80 md:w-80 lg:h-[28rem] lg:w-[28rem]"
                    />
                  </div>
                </div>

                <div className="basis-full md:basis-1/2  flex flex-col gap-4 p-3 h-full md:h-80  lg:h-[28rem] justify-between">
                  <div className="">
                    <p className="text-3xl font-bold tracking-wider ">
                      {dataDetail?.name}{' '}
                    </p>
                    <p className="text-xl my-5">{dataDetail?.description}</p>
                    <p className="text-xl">
                      Harga:{' '}
                      <span className="font-semibold">{dataDetail?.price}</span>{' '}
                    </p>
                    <p className="text-xl">
                      Stok:{' '}
                      <span className="font-semibold">{dataDetail?.stock}</span>{' '}
                      Kg
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold">Nego Harga:</p>
                    <form
                      onSubmit={formikTawar.handleSubmit}
                      className="w-full flex justify-between"
                    >
                      <div className="flex w-3/4 gap-3">
                        <div className="w-2/3">
                          <Input
                            id="nego"
                            name="nego"
                            label="input harga nego"
                            type="number"
                            value={formikTawar.values.nego}
                            onChange={formikTawar.handleChange}
                            onBlur={formikTawar.handleBlur}
                            error={formikTawar.errors.nego}
                            touch={formikTawar.touched.nego}
                          />
                        </div>
                        <div className="w-1/3">
                          <Input
                            id="quantity"
                            name="quantity"
                            label="jumlah"
                            type="number"
                            value={formikTawar.values.quantity}
                            onChange={formikTawar.handleChange}
                            onBlur={formikTawar.handleBlur}
                            error={formikTawar.errors.quantity}
                            touch={formikTawar.touched.quantity}
                          />
                        </div>
                      </div>
                      <button
                        id="button-to-tawar"
                        className="btn btn-primary text-base text-primary-content w-max"
                      >
                        Tawar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </Layout>
          )}
        </>
      )}
    </Layout>
  );
}

export default DetailBeli;
