import { Link } from "react-router-dom";
import "./Card.css";
import { AiFillPlayCircle, AiFillEdit, AiFillDelete } from "react-icons/ai";

const Card = ({ name, id, link, EditCard, DeleteCard, openVideoModal }) => {
  return (
    <div className="Card">
      <h3 className="CardHeader">{name}</h3>
      <div className="IconContainer">
        <button
          className="IconButton"
          onClick={() => openVideoModal(name, link, id)}
        >
          <AiFillPlayCircle />
        </button>
        <button className="IconButton" onClick={() => EditCard(name, link, id)}>
          <AiFillEdit />
        </button>
        <button className="IconButton" onClick={() => DeleteCard(id)}>
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};
export default Card;
