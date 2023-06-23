import Layout from '../components/Layout';
import { Suspense, lazy } from 'react';
import { data as dummyData } from '../json/dummyProduk.json';
import { data as dummyAlat } from '../json/dummyAlat.json';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import imgBwh from '../assets/hero_unsplash_3.png';
import { FaArrowRight } from 'react-icons/fa';

const CardHome = lazy(() => import('../components/CardHome'));

function Homepage() {
  const [cookie] = useCookies(['role']);
  const ckRole = cookie.role;
  const navigate = useNavigate();
  return (
    <Layout chose="layout">
      {ckRole === 'admin' ? (
        <Layout
          chose="section"
          addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-8 md:py-16 flex  items-center "
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
                  {dummyData.map((data, idx) => {
                    return (
                      <CardHome
                        key={idx}
                        id={data.productName}
                        image={data.image}
                        text={data.productName}
                        label="detail"
                        price={data.price.toString()}
                        stok={data.quantity.toString()}
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
            addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-8 md:py-16 flex  items-center "
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
                    {dummyAlat.map((data, idx) => {
                      return (
                        <CardHome
                          key={idx}
                          id={data.productName}
                          image={data.image}
                          text={data.productName}
                          label="detail"
                          price={data.price.toString()}
                          stok={data.quantity.toString()}
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
