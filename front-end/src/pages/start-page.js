import { useNavigate } from "react-router-dom";

const StartPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="start-page">
                <div className="find-box" onClick={() => navigate('/find/username')}>
                    <h1>Find corresponding by users' Github username</h1>
                </div>

                <div className="find-box" onClick={() => navigate('/find/name')}>
                    <h1>Find corresponding by first/last name of users</h1>
                </div>
            </div>
        </>
    )
}

export default StartPage;