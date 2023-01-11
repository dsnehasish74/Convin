import "./Input.css";
const Input = ({ name, value, setValue }) => {
  return (
    <div className="inputContainer">
      <label className="inputlabel">{name}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="inputField"
        placeholder={"Enter " + name}
      />
    </div>
  );
};

export default Input;
