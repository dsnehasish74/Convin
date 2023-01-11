import { InfinitySpin } from "react-loader-spinner";
import "./Loading.css";
const Loading = () => {
  return (
    <div className="loadingContainer">
      <InfinitySpin width="200" color="#64ffda" />
      {/* <Sugar /> */}
    </div>
  );
};

export default Loading;
