import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Sidebar from "../../Components/Sidebar/Sidebar";
import HeadSection from "../../Components/HeadSection/HeadSection";
import ModalContainer from "../../Components/Modal/Modal";
import { useState, useEffect } from "react";
import { ButtonTypes } from "../../Constants/ButtonTypes";
import Card from "../../Components/Card/Card";
import Input from "../../Components/Input/Input";
import { auth, firebase, provider, db } from "../../firebase";
import { useParams } from "react-router-dom";
import validator from "validator";
import Empty from "../../Asset/Images/Empty.svg";
import "./Bucket.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Bucket = () => {
  const [loading, setLoading] = useState(true);
  const [nameOfTheCard, setNameOfTheCard] = useState("");
  const [linkOfTheCard, setLinkOfTheCard] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isVideoModal, setIsVideoModal] = useState(false);
  const [cardLists, setCardLists] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [playableLink, setPlayableLink] = useState("");
  const [bucketName, setBucketName] = useState("");
  const user = useSelector((state) => state.userId.userid);
  let { id } = useParams();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // get All Cards

  const getData = () => {
    let results = [];
    db.collection("User")
      .doc(user)
      .collection("Bucket")
      .doc(id)
      .collection("Cards")
      .orderBy("createdAt", "desc")
      .get()
      .then(({ docs }) => {
        docs.map((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        console.log(results);
        setCardLists(results);
      });
  };
  const getBucketName = () => {
    db.collection("User")
      .doc(user)
      .collection("Bucket")
      .doc(id)
      .get()
      .then((doc) => {
        setBucketName(doc.data().name);
      });
  };
  useEffect(() => {
    if (user) {
      getData();
      getBucketName();
    }
  }, [user]);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setNameOfTheCard("");
    setLinkOfTheCard("");
    setIsOpenModal(false);
    setIsEdit(null);
  };

  const openVideoModal = (name, link, cid) => {
    if (user) {
      db.collection("User")
        .doc(user)
        .collection("history")
        .add({
          name: name,
          link: link,
          id: cid,
          createdAt: new firebase.firestore.Timestamp.now(),
        })
        .then(() => {
          setIsVideoModal(true);
          setPlayableLink(link);
        });
    }
  };

  const closeVideoModal = () => {
    setIsVideoModal(false);
    setPlayableLink("");
  };

  const validateUrl = (value) => {
    if (validator.isURL(value)) {
      return true;
    } else {
      toast("Please Enter a valid URL");
      return false;
    }
  };

  const CreateCard = () => {
    console.log(1);
    if (user && nameOfTheCard.length > 0 && validateUrl(linkOfTheCard)) {
      console.log(2);

      if (isEdit) {
        console.log(3);
        db.collection("User")
          .doc(user)
          .collection("Bucket")
          .doc(id)
          .collection("Cards")
          .doc(isEdit)
          .update({
            name: nameOfTheCard,
            link: linkOfTheCard,
          })
          .then(() => {
            toast("Success");
            closeModal();
            getData();
          });
      } else {
        console.log(4);
        db.collection("User")
          .doc(user)
          .collection("Bucket")
          .doc(id)
          .collection("Cards")
          .add({
            name: nameOfTheCard,
            link: linkOfTheCard,
            createdAt: new firebase.firestore.Timestamp.now(),
          })
          .then(() => {
            toast("Success");
            closeModal();
            getData();
          });
      }
    } else {
      toast("Please fill All fields");
    }
  };

  const DeleteCard = (cardid) => {
    db.collection("User")
      .doc(user)
      .collection("Bucket")
      .doc(id)
      .collection("Cards")
      .doc(cardid)
      .delete()
      .then(() => {
        toast("Card successfully deleted!");
        getData();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const EditCard = (name, link, cid) => {
    setNameOfTheCard(name);
    setLinkOfTheCard(link);
    setIsEdit(cid);
    openModal();
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="BucketContainer">
        <Sidebar />
        <ToastContainer />
        <div className="rightBucketSection">
          <HeadSection
            buttonType={ButtonTypes.UploadVideo}
            openModal={openModal}
            isBucket={true}
            bucketInfo={bucketName}
          />
          <ModalContainer isOpenModal={isOpenModal} closeModal={closeModal}>
            <Input
              name="Name"
              value={nameOfTheCard}
              setValue={setNameOfTheCard}
            />
            <Input
              name="Video Link"
              value={linkOfTheCard}
              setValue={setLinkOfTheCard}
            />
            <button class="createButton" onClick={CreateCard}>
              Upload
            </button>
          </ModalContainer>
          <div className="bucketCardContainer">
            {cardLists.map((bucket, index) => {
              return (
                <Card
                  key={index}
                  name={bucket.name}
                  id={bucket.id}
                  link={bucket.link}
                  EditCard={EditCard}
                  DeleteCard={DeleteCard}
                  openVideoModal={openVideoModal}
                />
              );
            })}
            {cardLists.length == 0 && <img src={Empty} width={200} />}
          </div>

          <ModalContainer
            isOpenModal={isVideoModal}
            closeModal={closeVideoModal}
          >
            {playableLink && (
              <iframe width="420" height="345" src={playableLink}></iframe>
            )}
          </ModalContainer>
        </div>
      </div>
    );
  }
};

export default Bucket;
