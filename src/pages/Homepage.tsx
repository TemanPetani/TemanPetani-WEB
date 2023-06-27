import Layout from '../components/Layout';
import { Suspense, lazy, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import imgBwh from '../assets/hero_unsplash_3.png';
import { FaArrowRight } from 'react-icons/fa';
import api from '../utils/api';
import swal from '../utils/swal';
import withReactContent from 'sweetalert2-react-content';
import { getAllProduct } from '../utils/type';
import LoadingFull from '../components/LoadingFull';

const CardHome = lazy(() => import('../components/CardHome'));

function Homepage() {
  const [dataHomepage, setDataHomepage] = useState<getAllProduct[]>([]);

  const [load, setLoad] = useState<boolean>(false);
  const [cookie] = useCookies(['role', 'token']);

  const ckToken = cookie.token;
  const ckRole = cookie.role;
  const navigate = useNavigate();
  const MySwal = withReactContent(swal);

  const fetchProduct = async () => {
    setLoad(true);
    await api
      .getProductAll(ckToken, ckRole)
      .then(async (response) => {
        const { data } = response.data;
        await setDataHomepage(data.products);
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

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      {load ? (
        <LoadingFull />
      ) : ckRole === 'admin' ? (
        <Layout
          chose="section"
          addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-8 md:py-16 flex  items-center bg-base-200/20"
        >
          <div className="w-full h-max flex flex-col justify-center items-center pt-8">
            <p className="text-4xl uppercase lg:text-6xl font-semibold tracking-wider mb-8 self-start">
              Teman Petani
            </p>
            <div className="w-full h-full">
              <Suspense
                fallback={
                  <div className="w-full h-full flex flex-col justify-center items-center">
                    <span className="loading loading-ball loading-lg"></span>
                  </div>
                }
              >
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {dataHomepage?.map((data, idx) => {
                    return (
                      <CardHome
                        key={idx}
                        id={data.id}
                        image={data.imageUrl}
                        text={data.name}
                        label="detail"
                        price={data.price?.toString()}
                        stok={data.stock?.toString()}
                        onClick={() => navigate(`/detail/produk/${idx}`)}
                      />
                    );
                  })}
                </div>
              </Suspense>
            </div>
          </div>
        </Layout>
      ) : (
        <>
          <Layout
            chose="section"
            addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-8 md:py-16 flex  items-center bg-base-200/20"
          >
            <div className="w-full h-max flex flex-col justify-center items-center pt-8">
              <p className="text-4xl uppercase lg:text-6xl font-semibold tracking-wider mb-8 self-start">
                Teman Petani
              </p>
              <div className="w-full h-full">
                <Suspense
                  fallback={
                    <div className="w-full h-full flex flex-col justify-center items-center">
                      <span className="loading loading-ball loading-lg"></span>
                    </div>
                  }
                >
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {dataHomepage?.map((data, idx) => {
                      return (
                        <CardHome
                          key={idx}
                          id={data.id}
                          image={data.imageUrl}
                          text={data.name}
                          label="detail"
                          price={data.price?.toString()}
                          stok={data.stock?.toString()}
                          onClick={() => navigate(`/detail/alat/${idx}`)}
                        />
                      );
                    })}
                  </div>
                </Suspense>
              </div>
            </div>
          </Layout>
          <Layout
            chose="section"
            addClass="w-full h-max px-16 py-8 md:py-16 flex  items-center bg-base-200"
            id="section-gabung-kami"
          >
            <div className="basis-0  md:basis-1/2 flex justify-end mr-7">
              <div className="md:4/6 lg:w-3/5 bg-slate-500 h-max rounded-2xl">
                <img
                  src={imgBwh}
                  alt="gabung"
                  className="bg-cover bg-center rounded-2xl w-full"
                />
              </div>
            </div>
            <div className="basis-full md:basis-1/2  flex flex-col gap-4 p-3 md:rounded-nones rounded-2xl ">
              <div className="flex gap-3 items-center">
                <p className="font-semibold text-4xl  tracking-wide text-primary">
                  MULAI MENANAM!
                </p>
              </div>

              <p className="text-lg font-normal w-4/5">
                Mulailah menanam benih harapan, impian, dan keberhasilan.
                Bersiaplah untuk menikmati keindahan proses pertumbuhan, belajar
                dari pengalaman, dan merasakan kepuasan melihat hasil jerih
                payah Anda terwujud.
              </p>
              <Link
                id="button-to-tanam"
                to="/tanam"
                className="btn btn-primary text-base text-primary-content w-max"
              >
                Tanam Sekarang <FaArrowRight />
              </Link>
            </div>
          </Layout>
        </>
      )}
    </Layout>
  );
}

export default Homepage;
