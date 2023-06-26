import Layout from '../components/Layout';
import { Suspense, lazy } from 'react';
import { products as dummyData } from '../json/dummyTransaksi.json';

const CardDaftar = lazy(() => import('../components/CardDaftar'));

function DaftarTransaksi() {
  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-8 md:py-16 flex "
      >
        <div className="w-full h-max flex flex-col pt-8">
          <p className="text-2xl uppercase lg:text-4xl font-semibold tracking-wider mb-8 self-start">
            Daftar Transaksi
          </p>
          <div className="w-full h-max">
            <Suspense
              fallback={
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <span className="loading loading-ball loading-lg"></span>
                </div>
              }
            >
              <div className="w-full grid grid-cols-1 gap-10">
                {dummyData.map((data, idx) => {
                  return (
                    <CardDaftar
                      type="transaksi"
                      key={idx}
                      id={data.productName}
                      label={data.productName}
                      image={data.image}
                      date={data.createdAt}
                      price={data.price.toString()}
                      stok={data.quantity.toString()}
                      status={data.status}
                      bank={data.bank}
                      vaNumber={data.vaNumber}
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

export default DaftarTransaksi;
