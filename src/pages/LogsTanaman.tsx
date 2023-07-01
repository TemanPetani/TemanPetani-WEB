import Layout from '../components/Layout';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetPlantsDetail } from '../utils/type';
import { useCookies } from 'react-cookie';
import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import api from '../utils/api';
import LoadingFull from '../components/LoadingFull';

const CardTanam = lazy(() => import('../components/CardTanam'));

function LogsTanaman() {
  const [dataUserPlants, setDataUserPlants] = useState<GetPlantsDetail[]>([]);
  const [load, setLoad] = useState<boolean>(false);

  const [cookie, , removeCookie] = useCookies(['role', 'token']);
  const ckToken = cookie.token;

  const MySwal = withReactContent(swal);
  const navigate = useNavigate();

  const fetchMyPlant = async () => {
    setLoad(true);
    await api
      .getUserPlant(ckToken)
      .then(async (response) => {
        const { data } = response.data;
        await setDataUserPlants(data);
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

  useEffect(() => {
    fetchMyPlant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      {load ? (
        <LoadingFull />
      ) : (
        <Layout
          chose="section"
          addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-8 md:py-16 flex "
        >
          <div className="w-full h-max flex flex-col pt-8">
            <p className="text-2xl uppercase lg:text-4xl font-semibold tracking-wider mb-8 self-start">
              Tanamanku
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
                  {dataUserPlants?.map((prop, idx) => {
                    return (
                      <CardTanam
                        type="tanamanku"
                        key={idx}
                        title={prop.name}
                        text={prop.activities?.[0].name}
                        label="detail"
                        onClick={() => navigate(`/myplant/${prop.id}`)}
                      />
                    );
                  })}
                </div>
              </Suspense>
            </div>
          </div>
        </Layout>
      )}
    </Layout>
  );
}

export default LogsTanaman;
