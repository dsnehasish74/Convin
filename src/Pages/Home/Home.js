import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Sidebar from "../../Components/Sidebar/Sidebar";
import HeadSection from "../../Components/HeadSection/HeadSection";
import ModalContainer from "../../Components/Modal/Modal";
import { useState, useEffect } from "react";
import { ButtonTypes } from "../../Constants/ButtonTypes";
import BucketCard from "../../Components/BucketCard/BucketCard";
import Input from "../../Components/Input/Input";
import { auth, firebase, provider, db } from "../../firebase";
import "./Home.css";
import Empty from "../../Asset/Images/Empty.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [nameOfTheBucket, setNameOfTheBucket] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [bucketLists, setBucketLists] = useState([]);
  const user = useSelector((state) => state.userId.userid);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // get All Buckets
  const getData = () => {
    let results = [];
    db.collection("User")
      .doc(user)
      .collection("Bucket")
      .orderBy("createdAt", "desc")
      .get()
      .then(({ docs }) => {
        docs.map((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setBucketLists(results);
      });
  };
  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setNameOfTheBucket("");
    getData();
  };

  const CreateBucket = () => {
    if (user && nameOfTheBucket.length > 0) {
      db.collection("User")
        .doc(user)
        .collection("Bucket")
        .add({
          name: nameOfTheBucket,
          createdAt: new firebase.firestore.Timestamp.now(),
        })
        .then(() => {
          toast("Created");
          closeModal();
        });
    } else {
      toast("Please Sigin");
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    if (!user) {
      return <Navigate replace to="/login" />;
    }
    return (
      <div className="HomeContainer">
        <Sidebar />
        <ToastContainer />
        <div className="rightHomeSection">
          <HeadSection
            buttonType={ButtonTypes.CreateBucket}
            openModal={openModal}
          />
          <ModalContainer isOpenModal={isOpenModal} closeModal={closeModal}>
            <Input
              name="Name"
              value={nameOfTheBucket}
              setValue={setNameOfTheBucket}
            />
            <button class="createButton" onClick={CreateBucket}>
              Create
            </button>
          </ModalContainer>
          <div className="bucketCardContainer">
            {bucketLists.map((bucket, index) => {
              return (
                <BucketCard key={index} name={bucket.name} id={bucket.id} />
              );
            })}
            {bucketLists.length == 0 && <img src={Empty} width={200} />}
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
