import Loader from "react-loader-spinner";

const LoadingIndicator = () => {
  return (
    <div className="centerize overlay">
      <Loader type="ThreeDots" color="#00c2cb" height={200} width={200} />
    </div>
  );
};

export default LoadingIndicator;
