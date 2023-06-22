import React, { FC } from 'react';
import Navbar from './Navbar';

interface Props {
  children?: React.ReactNode;
  id?: string;
  addClass?: string;
  chose: string;
  navType?: string;
}

const Layout: FC<Props> = ({ children, chose, id, addClass, navType }) => {
  return (
    <>
      {chose === 'layout' ? (
        <>
          <div className="w-full min-h-screen flex flex-col">
            <Navbar styled={navType} />
            <div className="h-full w-full flex flex-col items-center justify-center">
              {children}
            </div>
          </div>
        </>
      ) : (
        <section
          id={id}
          className={`w-full min-h-screen ${addClass}`}
        >
          {children}
        </section>
      )}
    </>
  );
};

export default Layout;
