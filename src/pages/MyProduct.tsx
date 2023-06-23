import Layout from '../components/Layout';
import { Suspense, lazy, useState } from 'react';
import { data as dummyData } from '../json/dummyProduk.json';
import { data as dummyAlat } from '../json/dummyAlat.json';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import imgBwh from '../assets/hero_unsplash_3.png';
import { FaArrowRight } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modals } from '../components/Modals';
import { Input, InputFile, TextArea } from '../components/Input';

const CardHome = lazy(() => import('../components/CardHome'));

const schemaAddProduct = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number().required('Required'),
  stock: Yup.number().required('Required'),
  urlImage: Yup.mixed().required('Required'),
});

function MyProduct() {
  const [cookie] = useCookies(['role']);
  const ckRole = cookie.role;
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  const formikAddProduct = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      stock: '',
      urlImage: '',
    },
    validationSchema: schemaAddProduct,
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formikAddProduct.setFieldValue('urlImage', file);
      setPreview(URL.createObjectURL(file));
    }
  };

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
                id="urlImage"
                name="urlImage"
                label="urlImage name"
                onChange={handleImageChange}
                onBlur={formikAddProduct.handleBlur}
                error={formikAddProduct.errors.urlImage}
                touch={formikAddProduct.touched.urlImage}
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
                <p className=" self-start">Konfirmasi Password Baru:</p>{' '}
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
            <p className="text-4xl uppercase lg:text-6xl font-semibold tracking-wider mb-8 self-start">
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
                {dummyData.map((data, idx) => {
                  return (
                    <CardHome
                      key={idx}
                      id={data.productName}
                      image={data.image}
                      text={data.productName}
                      label="Edit"
                      price={data.price.toString()}
                      stok={data.quantity.toString()}
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
