import Layout from '../components/Layout';
import { Suspense, lazy, useState, useEffect } from 'react';
import { GetPlantsDetail } from '../utils/type';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import swal from '../utils/swal';
import withReactContent from 'sweetalert2-react-content';
import api from '../utils/api';
import LoadingFull from '../components/LoadingFull';
import toast from '../utils/toast';

const CardTanam = lazy(() => import('../components/CardTanam'));

function DetailLogTanaman() {
  const [dataPlantsDetail, setDataPlantsDetail] = useState<GetPlantsDetail>();
  const [load, setLoad] = useState<boolean>(false);

  const [cookie, , removeCookie] = useCookies(['role', 'token']);
  const ckToken = cookie.token;
  const { logs } = useParams();

  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);

  const isButtonDisabled = (startDate?: string) => {
    if (startDate) {
      const startDateObj = new Date(startDate);
      const today = new Date();
      return startDateObj > today;
    }

    return false;
  };

  const navigate = useNavigate();

  const fetchDetail = async (plantId?: string) => {
    setLoad(true);
    await api
      .getPlantId(ckToken, plantId)
      .then(async (response) => {
        const { data } = response.data;
        await setDataPlantsDetail(data);
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

  const putLogs = async (plantId?: string) => {
    setLoad(true);
    const today = new Date();
    const completed = {
      completedDate: today.toISOString().slice(0, -5) + 'Z',
    };

    await api
      .putPlant(ckToken, plantId, completed)
      .then((response) => {
        const { message } = response.data;
        MyToast.fire({
          icon: 'success',
          title: message,
        });
        fetchDetail(logs);
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      })
      .finally(() => setLoad(false));
  };

  const handlePutLogs = async (name?: string, id?: number) => {
    MySwal.fire({
      icon: 'question',
      title: 'Selesaikan Jadwal',
      text: `ingin menyelesaikan ${name}`,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await putLogs(id?.toString());
      }
    });
  };

  useEffect(() => {
    fetchDetail(logs);

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
              Jadwal: {dataPlantsDetail?.name}
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
                  {dataPlantsDetail?.activities?.map((data, idx) => {
                    return (
                      <CardTanam
                        type=""
                        key={idx}
                        title={data.name}
                        date={data.startDate}
                        completedDate={data.completedDate}
                        label="Selesai"
                        disabled={isButtonDisabled(data.startDate)}
                        onClick={() => handlePutLogs(data.name, data.id)}
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

export default DetailLogTanaman;
