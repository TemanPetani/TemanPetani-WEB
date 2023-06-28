import Layout from '../components/Layout';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modals } from '../components/Modals';
import { Input, InputFile, TextArea } from '../components/Input';
import api from '../utils/api';
import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import toast from '../utils/toast';
import { getAllProduct } from '../utils/type';

const CardHome = lazy(() => import('../components/CardHome'));

const schemaAddProduct = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number().required('Required'),
  stock: Yup.number().required('Required'),
  image: Yup.mixed().required('Required'),
});

function MyProduct() {
  const [cookie] = useCookies(['token', 'role', 'id']);
  const ckToken = cookie.token;
  const ckRole = cookie.role;

  const navigate = useNavigate();
  const [load, setLoad] = useState<boolean>(false);
  const [dataMyPeroducts, setDataMyPeroducts] = useState<getAllProduct[]>([]);

  const [preview, setPreview] = useState<string | null>(null);

  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);

  const formikAddProduct = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      stock: '',
      image: '',
    },
    validationSchema: schemaAddProduct,
    onSubmit: async (values) => {
      formDataToPost(values);
    },
  });

  const fetchProduct = async () => {
    setLoad(true);
    await api
      .getMyProduct(ckToken, ckRole)
      .then(async (response) => {
        const { data } = response.data;
        await setDataMyPeroducts(data.products);
      })
      .catch((error) => {
        const { data } = error.response;
        if (!ckToken) {
          MySwal.fire({
            title: 'Sesi Telah Berakhir',
            text: 'Harap login ulang untuk melanjutkan.',
            showCancelButton: false,
          }).then(() => {
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

  const postProduct = async (datad?: FormData) => {
    setLoad(true);
    await api
      .postProduct(ckToken, datad)
      .then((response) => {
        const { message, data } = response.data;
        putProductImage(datad, data.productId);

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
        setLoad(false);
      });
  };

  const putProductImage = async (datad?: FormData, productId?: string) => {
    await api
      .putProductImage(ckToken, datad, productId)
      .then(() => {
        formikAddProduct.resetForm();
        setPreview(null);
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

  const formDataToPost = async (datad?: any) => {
    const formData = new FormData();
    formData.append('name', datad.name);
    formData.append('description', datad.description);
    formData.append('stock', datad.stock);
    formData.append('price', datad.price);
    formData.append('image', datad.image);
    await postProduct(formData);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formikAddProduct.setFieldValue('image', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      <Modals
        id="modal-add-product"
        wide="wide"
      >
        <form
          onSubmit={formikAddProduct.handleSubmit}
          className="flex flex-col gap-3 items-center"
        >
          <p className="text-primary font-medium tracking-wide text-2xl mb-3">
            Tambah Produk
          </p>
          <div className="w-full flex md:flex-row flex-col  justify-center items-cente gap-3">
            <div className="md:w-[48%] md:h-[75%] w-full h-full">
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
                onBlur={formikAddProduct.handleBlur}
                error={formikAddProduct.errors.image}
                touch={formikAddProduct.touched.image}
              />
            </div>
            <div className="md:w-[48%] w-full">
              <div className="flex flex-col w-full">
                <p className=" self-start">Nama Produk:</p>{' '}
                <Input
                  id="name"
                  name="name"
                  label="Nama produk anda"
                  type="text"
                  value={formikAddProduct.values.name}
                  onChange={formikAddProduct.handleChange}
                  onBlur={formikAddProduct.handleBlur}
                  error={formikAddProduct.errors.name}
                  touch={formikAddProduct.touched.name}
                />
              </div>
              <div className="flex flex-col w-full">
                <p className=" self-start">Harga Produk:</p>{' '}
                <Input
                  id="price"
                  name="price"
                  label="Harga produk anda"
                  type="number"
                  value={formikAddProduct.values.price}
                  onChange={formikAddProduct.handleChange}
                  onBlur={formikAddProduct.handleBlur}
                  error={formikAddProduct.errors.price}
                  touch={formikAddProduct.touched.price}
                />
              </div>
              <div className="flex flex-col w-full">
                <p className=" self-start">Stok Produk:</p>{' '}
                <Input
                  id="stock"
                  name="stock"
                  label="stok produk anda"
                  type="number"
                  value={formikAddProduct.values.stock}
                  onChange={formikAddProduct.handleChange}
                  onBlur={formikAddProduct.handleBlur}
                  error={formikAddProduct.errors.stock}
                  touch={formikAddProduct.touched.stock}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className=" self-start">Deskripsi Produk:</p>{' '}
                <TextArea
                  id="description"
                  name="description"
                  label="Deskripsi Produk anda"
                  value={formikAddProduct.values.description}
                  onChange={formikAddProduct.handleChange}
                  onBlur={formikAddProduct.handleBlur}
                  error={formikAddProduct.errors.description}
                  touch={formikAddProduct.touched.description}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end gap-3">
            <div className="modal-action mt-0 ">
              {load === true ? (
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
                    htmlFor="modal-add-product"
                    className="btn btn-ghost"
                  >
                    Kembali
                  </label>
                  <button
                    id="btn-submit-add"
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
        addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-8 md:py-16 flex  items-center "
      >
        <div className="w-full h-max flex flex-col justify-center items-center pt-8">
          <div className="flex w-full justify-between">
            <p className="text-2xl uppercase lg:text-4xl font-semibold tracking-wider mb-8 self-start">
              Produk Saya
            </p>
            <label
              htmlFor="modal-add-product"
              className="btn btn-primary btn-wide"
            >
              Tambah Produk
            </label>
          </div>
          <div className="w-full h-full">
            <Suspense
              fallback={
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <span className="loading loading-ball loading-lg"></span>
                </div>
              }
            >
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {dataMyPeroducts?.map((data, idx) => {
                  return (
                    <CardHome
                      key={idx}
                      id={data.id}
                      image={data.imageUrl}
                      text={data.name}
                      label="edit"
                      price={data.price?.toString()}
                      stok={data.stock?.toString()}
                      onClick={() => navigate(`/edit/${idx}`)}
                    />
                  );
                })}
              </div>
            </Suspense>
          </div>
        </div>
      </Layout>
    </Layout>
  );
}

export default MyProduct;
