import { Link } from "react-router-dom";
import "./BucketCard.css";

const BucketCard = ({ name, id }) => {
  return (
    <Link className="bucketCard" to={"/" + id}>
      <div>
        <h3 className="bucketCardHeader">{name}</h3>
      </div>
    </Link>
  );
};
export default BucketCard;
