const Button = ({ onClick, text, color }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-lg btn-${color} `}
      style={{ fontSize: "11px", marginBottom: "5px", marginRight: "5px" }}
      type="submit"
    >
      {text}
    </button>
  );
};

export default Button;
