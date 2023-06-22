import logoWhite from '../assets/logo_white.svg';
import Layout from '../components/Layout';
import bgAtas from '../assets/hero_unsplash_1.png';
import imgBwh from '../assets/hero_unsplash_2.png';
import { lazy, Suspense } from 'react';
import { data as dummyData } from '../json/dummyProduk.json';
import { data as dummyAlat } from '../json/dummyAlat.json';
import ScrollToTopButton from '../components/BackToTopButton';
import { Link } from 'react-router-dom';

const CardLanding = lazy(() => import('../components/CardLanding'));

const Landing = () => {
  const handleClickScroll = (x: string) => {
    const element = document.getElementById(x);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <Layout
      navType="glass"
      chose="layout"
    >
      <Layout
        chose="section"
        addClass=" h-screen -mt-[67px] xl:-mt-[64px]"
        id="section-welcome"
      >
        <div
          className="bg-cover bg-[-6rem] md:bg-center w-full h-screen flex justify-center md:justify-end items-center px-16 md:px-16"
          style={{ backgroundImage: `url(${bgAtas})` }}
        >
          <div className="basis-0  md:basis-1/2"></div>
          <div className="basis-full md:basis-1/2  flex flex-col gap-4 md:bg-inherit md:backdrop-blur-0 bg-gray-800/40 backdrop-blur-sm md:bg-none p-3 md:p-0 md:rounded-nones rounded-2xl ">
            <div className="flex gap-3 items-center">
              <img
                src={logoWhite}
                alt="logo"
                className="w-10 h-10 md:shadow-lg"
              />
              <p className="font-semibold text-3xl text-base-100 md:drop-shadow-lg tracking-wide">
                TEMAN PETANI
              </p>
            </div>

            <p className="text-xl text-base-100 font-norma md:drop-shadow-lg  w-4/5">
              Teman Petani akan membantu Anda dalam bertani dan berkebun! Apakah
              Anda sedang mencari solusi terbaik untuk meningkatkan
              produktivitas dan hasil panen di lahan pertanian atau kebun Anda?
              Jangan khawatir, kami punya jawabannya.
            </p>
            <button
              id="button-to-section-layanan-kami"
              onClick={() => handleClickScroll('section-layanan-kami')}
              className="btn btn-secondary w-max text-base"
            >
              Mulai Sekarang
            </button>
          </div>
        </div>
      </Layout>

      <Layout
        chose="section"
        addClass="w-full min-h-max h-max px-16 py-8 md:py-16 flex  items-center bg-base-200/20"
        id="section-layanan-kami"
      >
        <div className="flex flex-col items-center">
          <p className="text-4xl lg:text-6xl font-semibold tracking-wider text-primary mb-8">
            Layanan Kami
          </p>
          <Suspense
            fallback={<span className="loading loading-dots loading-md"></span>}
          >
            <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              <CardLanding
                id="button-to-section-produksi"
                onClick={() => handleClickScroll('section-produksi')}
                text="Penjualan Hasil Tani"
              />
              <CardLanding
                id="button-to-section-alat-tani"
                onClick={() => handleClickScroll('section-alat-tani')}
                text="Pembelian Alat Tani"
              />
              <CardLanding
                id="button-to-section-gabung-kami"
                onClick={() => handleClickScroll('section-gabung-kami')}
                text="Penjadwalan Tanam"
              />
            </div>
          </Suspense>
        </div>
      </Layout>

      <Layout
        chose="section"
        addClass="w-full h-max px-16 py-8 md:py-16 flex  items-center bg-base-200/70"
        id="section-produksi"
      >
        <div className="flex flex-col items-center">
          <p className="text-4xl lg:text-6xl font-semibold tracking-wider text-primary mb-8">
            Produksi Mitra Kami
          </p>
          <Suspense
            fallback={
              <div className="w-full h-full flex flex-col justify-center items-center">
                <span className="loading loading-ball loading-lg"></span>
              </div>
            }
          >
            <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {dummyData.map((data, idx) => {
                return (
                  <CardLanding
                    key={idx}
                    image={data.image}
                    text={data.productName}
                  />
                );
              })}
            </div>
          </Suspense>
        </div>
      </Layout>

      <Layout
        chose="section"
        addClass="w-full h-max px-16 py-8 md:py-16 flex  items-center bg-base-200/20"
        id="section-alat-tani"
      >
        <div className="flex flex-col items-center">
          <p className="text-4xl lg:text-6xl font-semibold tracking-wider text-primary mb-8">
            Alat Produksi Kami
          </p>
          <Suspense
            fallback={
              <div className="w-full h-full flex flex-col justify-center items-center">
                <span className="loading loading-ball loading-lg"></span>
              </div>
            }
          >
            <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {dummyAlat.slice(0, 3).map((data, idx) => {
                return (
                  <CardLanding
                    key={idx}
                    image={data.image}
                    text={data.productName}
                  />
                );
              })}
            </div>
          </Suspense>
        </div>
      </Layout>

      <Layout
        chose="section"
        addClass="w-full h-max px-16 py-8 md:py-16 flex  items-center bg-base-200/70"
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
              Mari Bergabung
            </p>
          </div>

          <p className="text-lg font-normal w-4/5">
            Tunggu apa lagi? Bergabunglah dengan ribuan petani dan hobiis
            lainnya yang telah merasakan manfaat luar biasa dari web app kami.
            Dapatkan akses segera ke alat yang memudahkan dan menginspirasi
            dalam kegiatan bertani dan berkebun Anda. Mulailah perjalanan menuju
            keberhasilan pertanian dan kebun yang sukses dengan mendaftar
            sekarang juga!
          </p>
          <Link
            id="button-to-register"
            to="/register"
            className="btn btn-secondary w-max text-base"
          >
            Daftar disini
          </Link>
        </div>
      </Layout>
      <ScrollToTopButton
        first="section-welcome"
        second="section-layanan-kami"
      />
    </Layout>
  );
};

export default Landing;
