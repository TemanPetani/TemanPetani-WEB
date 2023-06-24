import Layout from '../components/Layout';
import { Suspense, lazy, useState } from 'react';
import { data as dummyData } from '../json/dummyTanam.json';
import { useCookies } from 'react-cookie';
import { Link, useNavigate, useParams } from 'react-router-dom';
import imgBwh from '../assets/hero_unsplash_3.png';
import { FaArrowRight } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modals } from '../components/Modals';
import { Input, InputFile, TextArea } from '../components/Input';

const CardTanam = lazy(() => import('../components/CardTanam'));

function LogsTanaman() {
  const [cookie] = useCookies(['role']);
  const ckRole = cookie.role;
  const navigate = useNavigate();
  const { transactionId } = useParams();

  return (
    <Layout chose="layout">
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
                {dummyData.map((data, idx) => {
                  return (
                    <CardTanam
                      type="tanamanku"
                      key={idx}
                      title={data.name}
                      text={data.text}
                      label="detail"
                      onClick={() => navigate(`/tanaman_saya/${idx}`)}
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

export default LogsTanaman;
