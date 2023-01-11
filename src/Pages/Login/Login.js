import { auth, firebase, provider } from "../../firebase";
import { useState, useEffect } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
const Login = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const user = useSelector((state) => state.userId.userid);
  console.log(user);
  const handleSiginWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
      })
      .catch(alert); // Error
  };
  if (loading) {
    return <Loading />;
  }
  if (user) {
    return <Navigate replace to="/" />;
  }
  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h2 className="loginHeader">Join Now</h2>
        <p className="loginSubHeader">Create your own personal Video Library</p>
        <button onClick={handleSiginWithGoogle} className="signinGoogle">
          <img
            src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227"
            className="googleImg"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
export default Login;
