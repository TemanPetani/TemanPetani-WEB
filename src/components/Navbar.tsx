import { FC } from 'react';
import NavLogWhite from '../assets/navbar_logo_white.svg';
import NavLogGreen from '../assets/navbar_logo_green.svg';
import placeholder from '../assets/placeholder_profile.svg';

import { Link, useNavigate } from 'react-router-dom';
import swal from '../utils/swal';
import { useCookies } from 'react-cookie';
import withReactContent from 'sweetalert2-react-content';

interface Props {
  styled?: string;
}

const Navbar: FC<Props> = ({ styled }) => {
  const [cookie, , removeCookie] = useCookies([
    'id',
    'token',
    'avatar',
    'role',
  ]);
  const ckRole = cookie.role;
  const ckAva = cookie.avatar;
  const navigate = useNavigate();
  const MySwal = withReactContent(swal);

  const handleLogout = async () => {
    MySwal.fire({
      title: 'Logout',
      text: 'Are you sure?',
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie('id');
        removeCookie('token');
        removeCookie('role');
        removeCookie('avatar');
        navigate('/landing');
      }
    });
  };

  return (
    <div
      className={`navbar px-16 sticky top-0 z-50 shadow-xl, ${
        styled === 'glass' ? `bg-black/30 backdrop-blur-sm` : 'bg-primary'
      } `}
    >
      <div className="flex-1">
        <Link
          to={'/'}
          className="btn btn-ghost normal-case text-xl w-52 hover:bg-inherit"
          id="navbar-button-home"
        >
          <img
            src={styled === 'glass' ? NavLogGreen : NavLogWhite}
            alt="img logo"
            className="drop-shadow-lg"
          />
        </Link>
      </div>
      <div className="flex-none gap-2">
        {styled === 'glass' ? (
          <>
            <Link
              id="navbar-to-register"
              to="/register"
              className="btn btn-secondary btn-outline w-32"
            >
              register
            </Link>
            <Link
              id="navbar-to-login"
              to="/login"
              className="btn btn-secondary w-32"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            {ckRole === 'admin' ? (
              <div className="badge badge-accent">Admin</div>
            ) : (
              <></>
            )}

            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar "
              >
                <div className="w-10 rounded-full border-2 border-base-100">
                  <img
                    src={
                      !ckAva || ckAva === null || ckAva === undefined
                        ? placeholder
                        : ckAva
                    }
                    alt={`User's profile picture`}
                    className="h-10 w-10 border-spacing-1 rounded-full object-cover object-center"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-md dropdown-content bg-base-200 rounded-box w-40 gap-1"
              >
                {' '}
                <li>
                  <Link to="/negotiation">Daftar Nego</Link>
                </li>
                <li>
                  <Link to="/solds">Daftar Terjual</Link>
                </li>
                <li>
                  <Link to="/transaction">Daftar Transaksi</Link>
                </li>
                <div className="divider my-0.5"></div>
                <li>
                  <Link to="/myproduct">Produk Saya</Link>
                </li>
                {ckRole === 'admin' ? (
                  <>
                    <li>
                      <Link to="/plant_templates">Jadwal Tanam</Link>
                    </li>
                    <li>
                      <Link to="/schedules">Jadwal Petani</Link>
                    </li>
                    <div className="divider my-0.5"></div>
                  </>
                ) : (
                  <>
                    <div className="divider my-0.5"></div>
                    <li>
                      <Link to="/plant">Tanam sekarang</Link>
                    </li>
                    <li>
                      <Link to="/myplant">Tanaman Saya</Link>
                    </li>
                    <div className="divider my-0.5"></div>
                    <li>
                      <Link to="/profile">Profil</Link>
                    </li>
                  </>
                )}
                <li>
                  <a onClick={() => handleLogout()}>Logout</a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
