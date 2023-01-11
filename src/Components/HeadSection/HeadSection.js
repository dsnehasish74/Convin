import { ButtonTypes } from "../../Constants/ButtonTypes";
import { Link } from "react-router-dom";
import "./HeadSection.css";
const HeadSection = ({ isBucket, bucketInfo, buttonType, openModal }) => {
  return (
    <div className="headSection">
      <p>
        <Link className="headSectionLink" to="/">
          Home
        </Link>
        {isBucket && (
          <span className="headSectionLink">{" / " + bucketInfo}</span>
        )}
      </p>
      <button className="uploadButton" onClick={openModal}>
        {buttonType == ButtonTypes.CreateBucket ? "Create Bucket" : "Upload"}
      </button>
    </div>
  );
};
export default HeadSection;
