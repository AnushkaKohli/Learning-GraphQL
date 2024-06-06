import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/display");
        }}
      >
        Display Data
      </button>
      <button
        onClick={() => {
          navigate("/mutate");
        }}
      >
        Mutate Data
      </button>
    </div>
  );
};

export default Home;
