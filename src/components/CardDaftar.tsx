import React, { FC } from 'react';
import placeholder from '../assets/polaceholder_image.svg';

interface CardDaftarType {
  type: string;
  id?: string;
  image?: string;
  price?: string;
  stok?: string;
  label?: string;
  date?: string;

  onClickTerima?: React.MouseEventHandler;
  onClickTolak?: React.MouseEventHandler;
  nego?: string;

  status?: string;
  vaNumber?: string;
  bank?: string;
}

const CardDaftar: FC<CardDaftarType> = ({
  image,
  onClickTerima,
  onClickTolak,
  id,
  label,
  price,
  stok,
  date,
  nego,
  type,
  status,
  vaNumber,
  bank,
}) => {
  const dateType = (date: any) => {
    const dated: any = new Date(date);
    const formattedDate = dated.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  };

  return (
    <div
      id={`card-${type}: ${id}`}
      className="w-full h-max  rounded-2xl bg-base-100 shadow-xl p-4"
    >
      <p className="font-medium text-lg">Transaksi Tanggal: {dateType(date)}</p>
      {type === 'nego' ? (
        <div className="w-full flex flex-col md:flex-row py-3 md:justify-between">
          <div className="flex gap-2">
            <img
              src={image ? image : placeholder}
              alt="image"
              className="object-cover object-center h-36 w-3h-36 rounded-2xl"
            />
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold tracking-wider">{label}</p>
              <p className="text-lg">
                Kuantitas :{' '}
                <span className="font-semibold">{stok ? stok : 'Kosong'}</span>
              </p>
              <p className="text-lg">
                Harga:{' '}
                <span className="font-semibold">
                  {price ? price : 'Kosong'}
                </span>
              </p>
              <p className="text-lg">
                Harga Nego:{' '}
                <span className="font-semibold">{nego ? nego : 'Kosong'}</span>
              </p>
            </div>
          </div>
          <div className="self-center md:self-end mt-5 md:mt-0 flex gap-3">
            <button
              id={`button-card-${label}`}
              onClick={onClickTolak}
              className="btn btn-primary btn-outline text-primary w-32"
            >
              TOLAK
            </button>
            <button
              id={`button-card-${label}`}
              onClick={onClickTerima}
              className="btn btn-primary w-32"
            >
              TERIMA
            </button>
          </div>
        </div>
      ) : type === 'jual' ? (
        <div className="w-full flex flex-col md:flex-row py-3 md:justify-between">
          <div className="flex gap-2">
            <img
              src={image ? image : placeholder}
              alt="image"
              className="object-cover object-center h-36 w-3h-36 rounded-2xl"
            />
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold tracking-wider">{label}</p>
              <p className="text-lg">
                Kuantitas :{' '}
                <span className="font-semibold">{stok ? stok : 'Kosong'}</span>
              </p>
              <p className="text-lg">
                Di bayar : Rp{' '}
                <span className="font-semibold">
                  {price ? price : 'Kosong'}
                </span>
              </p>
            </div>
          </div>
          <div className="self-center md:self-start mt-5 md:mt-0 flex gap-3">
            <div
              className={`badge w-40 p-5 ${
                status === 'sudah dibayar' ? 'badge-success' : 'badge-error'
              }`}
            >
              {status}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col md:flex-row py-3 md:justify-between">
          <div className="flex gap-2">
            <img
              src={image ? image : placeholder}
              alt="image"
              className="object-cover object-center h-36 w-3h-36 rounded-2xl"
            />
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold tracking-wider">{label}</p>
              <p className="text-lg">
                Kuantitas :{' '}
                <span className="font-semibold">{stok ? stok : 'Kosong'}</span>
              </p>
              <p className="text-lg">
                Di bayar : Rp{' '}
                <span className="font-semibold">
                  {price ? price : 'Kosong'}
                </span>
              </p>
              <p className="text-lg">
                Bank :{' '}
                <span className="font-semibold uppercase">
                  {bank ? bank : 'Kosong'}
                </span>
              </p>
              <p className="text-lg">
                VA Number :{' '}
                <span className="font-semibold">
                  {vaNumber ? vaNumber : 'Kosong'}
                </span>
              </p>
            </div>
          </div>
          <div className="flex-col mt-5 md:mt-0 flex justify-between items-end gap-3">
            <div
              className={`badge w-40 p-5 ${
                status === 'pending' ? 'badge-error' : 'badge-success'
              }`}
            >
              {status}
            </div>
            {status === 'pending' ? (
              <button
                id={`button-card-${label}`}
                onClick={onClickTerima}
                className="btn btn-primary w-max"
              >
                CARA PEMBAYARAN
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDaftar;
