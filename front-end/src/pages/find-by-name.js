import { useNavigate } from "react-router-dom";

const FindByName = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <button type="button" class="btn btn-success" onClick={() => navigate('/')}>Back to Home</button>
                <h1>Find By Name</h1>
            </div>
        </>
    )
}

export default FindByName;