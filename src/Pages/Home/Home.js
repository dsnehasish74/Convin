import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Sidebar from "../../Components/Sidebar/Sidebar";
import HeadSection from "../../Components/HeadSection/HeadSection";
import ModalContainer from "../../Components/Modal/Modal";
import { useState, useEffect } from "react";
import { ButtonTypes } from "../../Constants/ButtonTypes";
import "./Home.css";
const Home = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const user = useSelector((state) => state.userId.userid);

  if (loading) {
    return <Loading />;
  } else {
    if (!user) {
      return <Navigate replace to="/login" />;
    }
    return (
      <div className="HomeContainer">
        <Sidebar />
        <div className="rightHomeSection">
          <HeadSection buttonType={ButtonTypes.CreateBucket} />
          <ModalContainer>
            <div>I am a modal</div>
            <form>
              <input />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form>
          </ModalContainer>
        </div>
      </div>
    );
  }
};

export default Home;
