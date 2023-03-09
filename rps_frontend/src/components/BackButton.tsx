
import { useNavigate} from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div style={{ width: '100%' }}>
      <button onClick={() => navigate(-1)} type="button" className="btn btn-dark">
        <BiArrowBack className="mx-1 back-button" />
        Back
      </button>
    </div>
  );
};

export default BackButton;