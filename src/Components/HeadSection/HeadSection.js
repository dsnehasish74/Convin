import { ButtonTypes } from "../../Constants/ButtonTypes";
import { Link } from "react-router-dom";
import "./HeadSection.css";
const HeadSection = ({ isBucket, busketInfo, buttonType }) => {
  return (
    <div className="headSection">
      <p>
        <Link className="headSectionLink">Home</Link>
        {isBucket && <Link>{"/" + busketInfo}</Link>}
      </p>
      <button className="uploadButton">
        {buttonType == ButtonTypes.CreateBucket ? "Create" : "Upload"}
      </button>
    </div>
  );
};
export default HeadSection;
