import Layout from '../components/Layout';
import { Suspense, lazy, useState } from 'react';
import { data as dummyData } from '../json/dummyJadwalPetani.json';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaArrowRight,
  FaPen,
  FaRegEdit,
  FaTasks,
  FaTrashAlt,
} from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modals } from '../components/Modals';
import { Input, InputFile, TextArea } from '../components/Input';

function JadwalPetani() {
  const [cookie] = useCookies(['role']);
  const ckRole = cookie.role;
  const navigate = useNavigate();
  const [petani, setPetani] = useState<string>();
  const [tanaman, setTanaman] = useState<string>();

  const dateType = (date: any) => {
    const dated: any = new Date(date);
    const formattedDate = dated.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  };
  return (
    <Layout chose="layout">
      <Modals
        wide="wide"
        id="modal-detail-tasks"
      >
        <div className="flex flex-col gap-3 items-center">
          <p className="text-primary font-medium tracking-wide text-2xl mb-3">
            Detail Aktivitas
          </p>
          <div className="w-4/5">
            <p className="text-neutral self-start font-medium tracking-wide text-lg">
              {petani}
            </p>
            <p className="text-neutral self-start font-medium tracking-wide text-lg">
              Tanaman: {tanaman}
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
                    {dummyData.detail.map((prop, idx) => {
                      return (
                        <tr key={idx}>
                          <th>{idx + 1}</th>
                          <td>{prop.tasks}</td>
                          <td>{dateType(prop.date)}</td>
                          <td>{dateType(prop.dateactual)}</td>
                        </tr>
                      );
                    })}
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
        </div>
      </Modals>
      <Layout
        chose="section"
        addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-8 md:py-16 flex  items-center "
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
                    <th className="w-[10%]"></th>
                    <th className="w-[55%]"> Nama Petani</th>
                    <th className="w-[20%]">Tanaman</th>
                    <th className="w-[15%]">Tahap</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.petani.map((prop, idx) => {
                    return (
                      <tr key={idx}>
                        <th>{idx + 1}</th>
                        <td>{prop.name}</td>
                        <td>{prop.tanaman}</td>
                        <td>
                          <label
                            htmlFor="modal-detail-tasks"
                            className="btn p-0 min-h-0 h-0 p text-base"
                            onClick={() => {
                              setPetani(prop.name), setTanaman(prop.tanaman);
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
    </Layout>
  );
}

export default JadwalPetani;
