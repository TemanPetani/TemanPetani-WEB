import Layout from '../components/Layout';
import { Suspense, lazy } from 'react';
import { data as dummyData } from '../json/dummyDetailTanam.json';

const CardTanam = lazy(() => import('../components/CardTanam'));

function DetailLogTanaman() {
  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-8 md:py-16 flex "
      >
        <div className="w-full h-max flex flex-col pt-8">
          <p className="text-2xl uppercase lg:text-4xl font-semibold tracking-wider mb-8 self-start">
            Jadwal: {dummyData.name}
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
                {dummyData.step.map((data, idx) => {
                  return (
                    <CardTanam
                      type=""
                      key={idx}
                      title={data.tasks}
                      date={data.date}
                      label="Selesai"
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

export default DetailLogTanaman;
