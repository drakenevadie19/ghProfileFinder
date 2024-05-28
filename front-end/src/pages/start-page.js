import { useNavigate } from "react-router-dom";

const StartPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="start-page">
                <h1>Want to find Github profile?</h1>
                <div className="find-box-frame">
                    <div className="find-box" onClick={() => navigate('/find/username')}>
                        <h3>Finding by Github username</h3>
                    </div>

                    <div className="find-box" onClick={() => navigate('/find/name')}>
                        <h3>Finding by users' name</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StartPage;