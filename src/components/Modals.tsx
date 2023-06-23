import React, { FC } from 'react';

interface Props {
  children?: React.ReactNode;
  id?: string;
  wide?: string;
}

export const Modals: FC<Props> = ({ children, id, wide }) => {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="modal-toggle"
      />
      <div className="modal">
        <div
          className={`modal-box ${wide === 'wide' ? 'w-11/12 max-w-5xl' : ''}`}
        >
          {children}
        </div>
      </div>
    </>
  );
};
