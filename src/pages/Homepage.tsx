import Logo from '../assets/logo_vector.svg';
import Layout from '../components/Layout';

function Homepage() {
  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="w-full h-screen"
      >
        <div className="w-full h-full bg-neutral flex flex-col justify-center items-center">
          <img
            src={Logo}
            alt=""
          />
        </div>
      </Layout>
    </Layout>
  );
}

export default Homepage;
