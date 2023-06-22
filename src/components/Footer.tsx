import { FC } from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import logos from '../assets/logo_green.svg';
import { Link } from 'react-router-dom';

const Footer: FC = () => {
  return (
    <footer className="footer footer-center py-4 bg-success rounded w-full gap-4">
      <div className="flex items-center justify-between w-full px-32">
        <div>
          <Link
            to="/"
            id="to-home"
            className="cursor-pointer"
          >
            <img
              src={logos}
              alt="logo-event-planner"
            />
          </Link>
        </div>
        <p className="hidden md:inline">
          Copyright © 2023 ALTA-CAPSTONE-GROUP1. All Rights Reserved.
        </p>
        <div className="grid grid-flow-col gap-3">
          <a className="cursor-pointer">
            <div className="border p-2 border-neutral rounded-full">
              <FaFacebookF size={'.8rem'} />
            </div>
          </a>

          <a className="cursor-pointer">
            <div className="border p-2 border-neutral rounded-full">
              <FaLinkedinIn size={'.8rem'} />
            </div>
          </a>

          <a className="cursor-pointer">
            <div className="border p-2 border-neutral rounded-full">
              <FaTwitter size={'.8rem'} />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
