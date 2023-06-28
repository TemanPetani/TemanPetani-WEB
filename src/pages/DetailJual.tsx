import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import imgBwh from '../assets/polaceholder_image.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modals } from '../components/Modals';
import { Input, InputFile, TextArea } from '../components/Input';
import api from '../utils/api';
import { useCookies } from 'react-cookie';
import { getAllProduct } from '../utils/type';
import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import toast from '../utils/toast';
import LoadingFull from '../components/LoadingFull';

const schemaEdit = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number().required('Required'),
  stock: Yup.number().required('Required'),
});

const schemaImage = Yup.object().shape({
  image: Yup.mixed().required('Required'),
});

function DetailJual() {
  const [preview, setPreview] = useState<string | null>(null);
  const [load, setLoad] = useState<boolean>(false);
  const [loadPost, setLoadPost] = useState<boolean>(false);

  const [dataDetail, setDataDetail] = useState<getAllProduct>();
  const navigate = useNavigate();
  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);

  const [cookie, , removeCookie] = useCookies(['token', 'role']);
  const ckToken = cookie.token;
  const ckRole = cookie.role;

  const { productId } = useParams();

  const formikEdit = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      stock: '',
    },
    validationSchema: schemaEdit,
    onSubmit: async (values) => {
      formDataToPost(values);
    },
  });
  const formikImage = useFormik({
    initialValues: {
      image: '',
    },
    validationSchema: schemaImage,
    onSubmit: async (values) => {
      formImageToPost(values);
    },
  });

  const fetchProduct = async () => {
    setLoad(true);
    await api
      .getProductId(ckToken, productId)
      .then(async (response) => {
        const { data } = response.data;
        await setDataDetail(data.product);
        formikEdit.setFieldValue('name', data.product.name);
        formikEdit.setFieldValue('description', data.product.description);
        formikEdit.setFieldValue('price', data.product.price);
        formikEdit.setFieldValue('stock', data.product.stock);
        setPreview(data.product.imageUrl);
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

  const putProduct = async (datad?: FormData) => {
    setLoadPost(true);
    await api
      .putProductText(ckToken, datad, productId)
      .then((response) => {
        const { message } = response.data;
        fetchProduct();

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
      .finally(() => setLoadPost(false));
  };

  const putProductImage = async (datad?: FormData) => {
    await api
      .putProductImage(ckToken, datad, productId)
      .then((response) => {
        const { message } = response.data;

        fetchProduct();
        setPreview(null);

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
      .finally(() => setLoadPost(false));
  };

  const delProductId = async (id?: string) => {
    await api
      .delProductId(ckToken, id)
      .then((response) => {
        const { message } = response.data;
        MyToast.fire({
          icon: 'success',
          title: message,
        });
        navigate('/myproduct');
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

  const handledelProductId = async (name?: string, id?: string) => {
    MySwal.fire({
      icon: 'question',
      title: 'Hapus Jadwal',
      text: `ingin menghapus ${name}`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        delProductId(id);
      }
    });
  };

  const formDataToPost = async (datad?: any) => {
    const formData = new FormData();
    formData.append('name', datad.name);
    formData.append('description', datad.description);
    formData.append('stock', datad.stock);
    formData.append('price', datad.price);
    await putProduct(formData);
  };

  const formImageToPost = async (datad?: any) => {
    const formData = new FormData();
    formData.append('image', datad.image);
    await putProductImage(formData);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formikImage.setFieldValue('image', file);
      setPreview(URL.createObjectURL(file));
    }
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
          <Modals id="modal-edit">
            <form
              onSubmit={formikEdit.handleSubmit}
              className="flex flex-col gap-2 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Detail Pembelian
              </p>
              <div className="flex flex-col w-full">
                <p className=" self-start">Nama Produk:</p>{' '}
                <Input
                  id="name"
                  name="name"
                  label="Nama produk anda"
                  type="text"
                  value={formikEdit.values.name}
                  onChange={formikEdit.handleChange}
                  onBlur={formikEdit.handleBlur}
                  error={formikEdit.errors.name}
                  touch={formikEdit.touched.name}
                />
              </div>
              <div className="flex flex-col w-full">
                <p className=" self-start">Harga Produk:</p>{' '}
                <Input
                  id="price"
                  name="price"
                  label="Harga produk anda"
                  type="number"
                  value={formikEdit.values.price}
                  onChange={formikEdit.handleChange}
                  onBlur={formikEdit.handleBlur}
                  error={formikEdit.errors.price}
                  touch={formikEdit.touched.price}
                />
              </div>
              <div className="flex flex-col w-full">
                <p className=" self-start">Stok Produk:</p>{' '}
                <Input
                  id="stock"
                  name="stock"
                  label="stok produk anda"
                  type="number"
                  value={formikEdit.values.stock}
                  onChange={formikEdit.handleChange}
                  onBlur={formikEdit.handleBlur}
                  error={formikEdit.errors.stock}
                  touch={formikEdit.touched.stock}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className=" self-start">Konfirmasi Password Baru:</p>{' '}
                <TextArea
                  id="description"
                  name="description"
                  label="Deskripsi Produk anda"
                  value={formikEdit.values.description}
                  onChange={formikEdit.handleChange}
                  onBlur={formikEdit.handleBlur}
                  error={formikEdit.errors.description}
                  touch={formikEdit.touched.description}
                />
              </div>

              <div className="w-full flex justify-end gap-3">
                <div className="modal-action mt-0 ">
                  {loadPost === true ? (
                    <button
                      id="btn-submit-add"
                      type="button"
                      className="btn btn-primary w-32 text-white"
                    >
                      <span className="loading loading-spinner"></span>
                    </button>
                  ) : (
                    <>
                      <label
                        htmlFor="modal-edit"
                        className="btn btn-ghost"
                      >
                        Kembali
                      </label>
                      <button
                        id="btn-edit"
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
          <Modals id="modal-ganti">
            <form
              onSubmit={formikImage.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Edit Image
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
                id="image"
                name="image"
                label="image name"
                onChange={handleImageChange}
                onBlur={formikImage.handleBlur}
                error={formikImage.errors.image}
                touch={formikImage.touched.image}
              />

              <div className="w-full flex justify-end gap-3">
                <div className="modal-action mt-0 ">
                  {loadPost === true ? (
                    <button
                      id="btn-submit-add"
                      type="button"
                      className="btn btn-primary w-32 text-white"
                    >
                      <span className="loading loading-spinner"></span>
                    </button>
                  ) : (
                    <>
                      <label
                        htmlFor="modal-ganti"
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
                    </>
                  )}
                </div>
              </div>
            </form>
          </Modals>

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
                  <p className="text-3xl font-bold tracking-wider capitalize">
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
                    {ckRole === 'admin' ? 'Unit' : 'Kg'}
                  </p>
                </div>

                <div className="flex self-end gap-3">
                  <label
                    id="button-to-ganti"
                    htmlFor="modal-ganti"
                    className="btn btn-primary text-base text-primary-content w-max"
                  >
                    Ganti Gambar
                  </label>
                  <label
                    id="button-to-edit"
                    htmlFor="modal-edit"
                    className="btn btn-primary text-base text-primary-content w-32"
                  >
                    Edit
                  </label>
                  <button
                    onClick={() =>
                      handledelProductId(dataDetail?.name, dataDetail?.id)
                    }
                    id="button-to-delete"
                    className="btn btn-error text-base text-error-content w-32"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </Layout>
        </>
      )}
    </Layout>
  );
}

export default DetailJual;
