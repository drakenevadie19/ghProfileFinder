import { useNavigate } from "react-router-dom";

const StartPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="start-page">
                <section style={{
                    padding: "2rem 0",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "1.25rem", // ~20px
                    lineHeight: "1.6",
                    width: "100%"
                }}>
                    <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>🔍 DevLookUp</h1>
                    <p>
                        <strong>Easily explore GitHub profiles by username.</strong>
                        Just enter a GitHub username to instantly view public profile details including bio, repositories, followers, and more — all powered by the GitHub API.
                    </p>

                    <h3 style={{ fontWeight: 800 }}>Advantages</h3>

                    <div className="advantage-box">
                        <ul className="advantage-list" style={{ listStyleType: "none", paddingLeft: 0 }}>
                            <li>✅ Fast and simple</li>
                            <li>✅ No login required</li>
                            <li>✅ Get insights into any GitHub user's public activity</li>
                        </ul>
                    </div>
                    <p className="slogan">
                        Start searching and discover developers around the world!
                    </p> 
                </section>

                <div className="find-box-frame">
                    <div className="find-box" onClick={() => navigate('/find/username')}>
                        <h3>Find by Github username</h3>
                    </div>

                    <div className="find-box" onClick={() => navigate('/find/name')}>
                        <h3>Find by users' name</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StartPage;