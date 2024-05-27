import { useNavigate } from "react-router-dom";

const FindByUserName = () => {
    const navigate = useNavigate();
    return (
        <>
            <button type="button" class="btn btn-success" onClick={() => navigate('/')}>Back to Home</button>
            <h1>Find By username</h1>
        </>
    )
}

export default FindByUserName;