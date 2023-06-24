import React, { FC } from 'react';
import placeholder from '../assets/polaceholder_image.svg';

interface CardNegoType {
  image?: string;
  text?: string;
  price?: string;
  stok?: string;
  onClickTerima?: React.MouseEventHandler;
  onClickTolak?: React.MouseEventHandler;
  id?: string;
  label?: string;
  date?: string;
  nego?: string;
}

const CardNego: FC<CardNegoType> = ({
  image,
  text,
  onClickTerima,
  onClickTolak,

  id,
  label,
  price,
  stok,
  date,
  nego,
}) => {
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
    <div
      id={id}
      className="w-full h-max  rounded-2xl bg-base-100 shadow-xl p-4"
    >
      <p className="font-medium text-lg">Transaksi Tanggal: {dateType(date)}</p>

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
              Jumlah:{' '}
              <span className="font-semibold">{stok ? stok : 'Kosong'}</span>
            </p>
            <p className="text-lg">
              Harga:{' '}
              <span className="font-semibold">{price ? price : 'Kosong'}</span>
            </p>
            <p className="text-lg">
              Harga Nego:{' '}
              <span className="font-semibold">{nego ? nego : 'Kosong'}</span>
            </p>
          </div>
        </div>
        <div className="self-center md:self-end mt-5 md:mt-0 flex gap-3">
          <button
            id={`button-card-${text}`}
            onClick={onClickTolak}
            className="btn btn-primary btn-outline text-primary w-32"
          >
            TOLAK
          </button>
          <button
            id={`button-card-${text}`}
            onClick={onClickTerima}
            className="btn btn-primary w-32"
          >
            TERIMA
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardNego;
