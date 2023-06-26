import Layout from './Layout';

const LoadingFull = () => {
  return (
    <Layout
      chose="section"
      addClass="h-screen flex justify-center items-center bg-base-200/20"
    >
      <span className="loading loading-spinner loading-lg text-neutral"></span>{' '}
    </Layout>
  );
};

export default LoadingFull;
