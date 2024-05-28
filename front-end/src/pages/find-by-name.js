import { useNavigate } from "react-router-dom";

const FindByName = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="find-frame">
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>
                <h2>Type in name of user you want to find to search:</h2>
                
            </div>
        </>
    )
}

export default FindByName;