import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { FaTasks } from 'react-icons/fa';
import { Modals } from '../components/Modals';
import api from '../utils/api';
import { useCookies } from 'react-cookie';
import swal from '../utils/swal';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import LoadingFull from '../components/LoadingFull';
import { GetPlantsDetail, Getplants } from '../utils/type';

function JadwalPetani() {
  const [dataPlants, setDataPlants] = useState<Getplants[]>([]);
  const [dataPlantsDetail, setDataPlantsDetail] = useState<GetPlantsDetail>();
  const [petani, setPetani] = useState<string | undefined>('');
  const [load, setLoad] = useState<boolean>(false);
  const [loadModal, setLoadModal] = useState<boolean>(false);

  const [cookie, , removeCookie] = useCookies(['role', 'token']);
  const ckToken = cookie.token;

  const MySwal = withReactContent(swal);
  const navigate = useNavigate();

  const dateType = (date: any) => {
    const dated: any = new Date(date);
    const formattedDate = dated.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  };

  const fetchJadwalPetani = async () => {
    setLoad(true);
    await api
      .getPlant(ckToken)
      .then(async (response) => {
        const { data } = response.data;
        await setDataPlants(data);
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

  const fetchDetail = async (plantId?: string) => {
    setLoadModal(true);
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
      .finally(() => setLoadModal(false));
  };

  useEffect(() => {
    fetchJadwalPetani();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      {load ? (
        <LoadingFull />
      ) : (
        <>
          <Modals
            wide="wide"
            id="modal-detail-tasks"
          >
            <div className="flex flex-col gap-3 items-center">
              <p className="text-primary font-medium tracking-wide text-2xl mb-3">
                Detail Aktivitas
              </p>
              {loadModal ? (
                <div className="w-full min-h-[6rem] flex flex-col justify-center items-center">
                  {' '}
                  <span className="loading loading-spinner loading-lg text-neutral"></span>{' '}
                </div>
              ) : (
                <>
                  <div className="w-4/5">
                    <p className="text-neutral self-start font-light text-base">
                      Petani: &nbsp;
                      <span className="text-lg font-medium tracking-wide capitalize">
                        {petani}
                      </span>
                    </p>
                    <p className="text-neutral self-start font-light text-base">
                      Jadwal: &nbsp;
                      <span className="text-lg font-medium tracking-wide capitalize">
                        {dataPlantsDetail?.name}
                      </span>
                    </p>
                    <p className="text-neutral self-start font-light text-base">
                      Tanggal Mulai: &nbsp;
                      <span className="text-lg font-medium tracking-wide capitalize">
                        {dateType(dataPlantsDetail?.startDate)}
                      </span>
                    </p>
                  </div>
                  <div className="w-full flex flex-col  justify-center items-center gap-3">
                    <div className="w-4/5 h-full">
                      <div className="overflow-x-auto w-full">
                        <table className="table bg-base-100">
                          <thead>
                            <tr>
                              <th className="w-[10%]"></th>
                              <th className="w-[40%]">Aktivitas</th>
                              <th className="w-[25%]">Rencana</th>
                              <th className="w-[25%]">Terlaksana</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataPlantsDetail?.activities ? (
                              dataPlantsDetail?.activities?.map((prop, idx) => {
                                return (
                                  <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>{prop.name}</td>
                                    <td>{dateType(prop.startDate)}</td>
                                    <td>
                                      {prop.completedDate === null
                                        ? 'Belum Terlaksana'
                                        : dateType(prop.completedDate)}
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <th></th>
                                <td>Belum Ada data</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex justify-end gap-3">
                    <div className="modal-action mt-0 ">
                      <label
                        htmlFor="modal-detail-tasks"
                        className="btn btn-ghost"
                      >
                        Kembali
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Modals>
          <Layout
            chose="section"
            addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-8 md:py-16 flex  items-start"
          >
            <div className="w-full h-max flex flex-col justify-center items-center pt-8">
              <div className="flex w-4/5 justify-between">
                <p className="text-2xl uppercase font-semibold tracking-wider mb-8 self-start">
                  Jadwal Petani
                </p>
              </div>
              <div className="w-4/5 h-full">
                <div className="overflow-x-auto w-full">
                  <table className="table bg-base-100">
                    <thead>
                      <tr>
                        <th className="w-[5%]"></th>
                        <th className="w-[60%]"> Nama Petani</th>
                        <th className="w-[25%]">Tanaman</th>
                        <th className="w-[10%]">Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataPlants?.map((prop, idx) => {
                        return (
                          <tr key={idx}>
                            <th>{idx + 1}</th>
                            <td>{prop.farmerName}</td>
                            <td>{prop.scheduleName}</td>
                            <td>
                              <label
                                htmlFor="modal-detail-tasks"
                                className="btn p-0 min-h-0 h-0 p text-base"
                                onClick={() => {
                                  fetchDetail(prop.id?.toString()),
                                    setPetani(prop?.farmerName);
                                }}
                              >
                                <FaTasks />
                              </label>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Layout>
        </>
      )}
    </Layout>
  );
}

export default JadwalPetani;
