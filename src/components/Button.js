const Button = ({ onClick, text, color }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${color} btn-sm   `}
      style={{
        // fontSize: "12px",
        marginBottom: "5px",
        marginRight: "5px",
        minHeight: "10px",
      }}
      type="submit"
    >
      {text}
    </button>
  );
};

export default Button;
