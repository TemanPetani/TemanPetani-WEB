import React, { FC } from 'react';
import placeholder from '../assets/polaceholder_image.svg';

interface CardHomeType {
  image?: string;
  text?: string;
  price?: string;
  stok?: string;
  onClick?: React.MouseEventHandler;
  id?: string;
  label: string;
}

const CardHome: FC<CardHomeType> = ({
  image,
  text,
  onClick,
  id,
  label,
  price,
  stok,
}) => {
  return (
    <div
      id={id}
      className="h-full rounded-2xl bg-base-100 transition-shadow shadow-xl hover:shadow-2xl"
    >
      <div className=" w-full p-3">
        <p className="font-semibold text-xl">{text ? text : ' '}</p>
      </div>

      <div className=" p-3">
        <img
          src={image ? image : placeholder}
          alt="image"
          className="object-none object-center w-full h-60 rounded-2xl"
        />
      </div>

      <div className="p-3 items-center gap-4 flex justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xl">Rp{price ? price : '0'}</p>
          <p className="text-xl">
            Stok:{' '}
            <span className="font-semibold">{stok ? stok : 'Kosong'}</span>
          </p>
        </div>

        <button
          id={`button-card-${text}`}
          onClick={onClick}
          className="btn btn-primary w-32"
        >
          {label}
        </button>
      </div>
    </div>
  );
};

export default CardHome;
