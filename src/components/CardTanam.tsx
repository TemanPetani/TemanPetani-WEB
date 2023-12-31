import React, { FC } from 'react';
import { FaArrowRight } from 'react-icons/fa';

interface CardTanamType {
  type: string;
  id?: string;
  text?: string;
  title?: string;
  date?: string;
  completedDate?: string;
  label?: string;
  disabled?: boolean | undefined;
  onClick?: React.MouseEventHandler;
  onClickDel?: React.MouseEventHandler;
}

const CardTanam: FC<CardTanamType> = ({
  type,
  id,
  text,
  title,
  date,
  completedDate,
  disabled,
  label,
  onClick,
  onClickDel,
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
      {type === 'tanamanku' ? (
        <div className="w-full flex flex-col md:flex-row py-3 md:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-semibold tracking-wider">{title}</p>
            <div className="divider my-0.5"></div>

            <p className="text-lg flex items-center gap-2">
              Aktivitas Hari Ini <FaArrowRight />{' '}
              <span className="font-semibold">{text ? text : 'Kosong'}</span>
            </p>
          </div>

          <div className="self-center md:self-end mt-5 md:mt-0 flex gap-3">
            {}
            <button
              id={`button-card-${title}`}
              onClick={onClickDel}
              disabled={disabled}
              className="btn btn-error btn-outline text-neutral w-32"
            >
              Delete
            </button>
            <button
              id={`button-card-${title}`}
              onClick={onClick}
              disabled={disabled}
              className="btn btn-primary w-32"
            >
              {label}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col md:flex-row py-3 md:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-lg flex items-center gap-2">
              <FaArrowRight />{' '}
              <span className="font-semibold">{title ? title : 'Kosong'}</span>
            </p>
            <div className="divider my-0.5"></div>
            <div className="flex gap-10">
              <p className="font-medium text-lg">
                Tanggal Aktivitas:{' '}
                <span className="font-semibold">{dateType(date)}</span>
              </p>
              {completedDate === null ? (
                <></>
              ) : (
                <p className="font-medium text-lg">
                  Tanggal Selesai:{' '}
                  <span className="font-semibold">
                    {dateType(completedDate)}
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="self-center md:self-end mt-5 md:mt-0 flex gap-3">
            {completedDate === null ? (
              <button
                id={`button-card-${title}`}
                onClick={onClick}
                disabled={disabled}
                className="btn btn-primary  w-32"
              >
                {label}
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

export default CardTanam;
