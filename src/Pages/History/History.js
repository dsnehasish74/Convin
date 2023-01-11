import Sidebar from "../../Components/Sidebar/Sidebar";
import "./History.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { auth, firebase, provider, db } from "../../firebase";
import Empty from "../../Asset/Images/Empty.svg";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.userId.userid);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (user) {
      db.collection("User")
        .doc(user)
        .collection("history")
        .orderBy("createdAt", "desc")
        .get()
        .then(({ docs }) => {
          let results = [];
          docs.map((doc) => results.push(doc.data()));
          setHistory(results);
        });
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="historyContainer">
      <Sidebar />
      <div className="rightHomeSection">
        <h1 className="historyHeader">History</h1>
        {history.map((h, index) => {
          return (
            <div className="HistoryCard" key={index}>
              <p>{h.name}</p>
              <a href={h.link}>link</a>
              <p>{h.createdAt.toDate().toDateString()}</p>
            </div>
          );
        })}
        {history.length == 0 && <img src={Empty} width={200} />}
      </div>
    </div>
  );
};
export default History;
