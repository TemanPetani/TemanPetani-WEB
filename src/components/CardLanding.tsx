import React, { FC } from 'react';
import placeholder from '../assets/polaceholder_image.svg';

interface CardLandingType {
  image?: string;
  text?: string;
  onClick?: React.MouseEventHandler;
  id?: string;
}

const CardLanding: FC<CardLandingType> = ({ image, text, onClick, id }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="w-full h-4/5">
        <img
          src={image ? image : placeholder}
          alt="image"
          className="bg-cover bg-center rounded-2xl p-1"
        />
      </div>
      <div className="card-body p-4 items-center gap-4">
        <h3 className="card-title">{text ? text : ' '}</h3>
        {onClick ? (
          <div className="card-actions justify-center">
            <button
              id={`button-card-${text}`}
              onClick={onClick}
              className="btn btn-primary w-32"
            >
              Selengkapnya
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default CardLanding;
