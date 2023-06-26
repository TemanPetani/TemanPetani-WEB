import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { product as dummyData } from '../json/dummyDetail.json';
import { useParams } from 'react-router-dom';
import imgBwh from '../assets/polaceholder_image.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modals } from '../components/Modals';
import { Input, InputFile, TextArea } from '../components/Input';

const schemaEdit = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number().required('Required'),
  stock: Yup.number().required('Required'),
});

const schemaImage = Yup.object().shape({
  urlImage: Yup.mixed().required('Required'),
});

function DetailJual() {
  const [preview, setPreview] = useState<string | null>(null);
  const { type, productId } = useParams();

  const formikEdit = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      stock: '',
    },
    validationSchema: schemaEdit,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const formikImage = useFormik({
    initialValues: {
      urlImage: '',
    },
    validationSchema: schemaImage,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  // const formDataToPost = async (datad?: any) => {
  //   const formData = new FormData();
  //   formData.append('productId', datad.productId);
  //   formData.append('description', datad.description);
  //   formData.append('address', datad.address);
  //   formData.append('price', datad.price);
  //   formData.append('homestay_picture', datad.homestay_picture);
  //   await console.log(formData);
  // };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formikImage.setFieldValue('urlImage', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    console.log(type, productId);
    formikEdit.setFieldValue('name', dummyData.name);
    formikEdit.setFieldValue('description', dummyData.description);
    formikEdit.setFieldValue('price', dummyData.price);
    formikEdit.setFieldValue('stock', dummyData.stock);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
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
                Konfirmasi
              </button>
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
            id="urlImage"
            name="urlImage"
            label="urlImage name"
            onChange={handleImageChange}
            onBlur={formikImage.handleBlur}
            error={formikImage.errors.urlImage}
            touch={formikImage.touched.urlImage}
          />

          <div className="w-full flex justify-end gap-3">
            <div className="modal-action mt-0 ">
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
            <div className="bg-slate-500 h-max rounded-2xl">
              <img
                src={imgBwh}
                alt="gabung"
                className="bg-cover bg-center rounded-2xl h-full w-full md:h-80 md:w-80 lg:h-[28rem] lg:w-[28rem]"
              />
            </div>
          </div>

          <div className="basis-full md:basis-1/2  flex flex-col gap-4 p-3 h-full md:h-80  lg:h-[28rem] justify-between">
            <div className="">
              <p className="text-3xl font-bold tracking-wider ">
                {dummyData.name}{' '}
              </p>
              <p className="text-xl my-5">{dummyData.description}</p>
              <p className="text-xl">
                Harga: <span className="font-semibold">{dummyData.price}</span>{' '}
              </p>
              <p className="text-xl">
                Stok: <span className="font-semibold">{dummyData.stock}</span>{' '}
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
                id="button-to-delete"
                className="btn btn-error text-base text-error-content w-32"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  );
}

export default DetailJual;
