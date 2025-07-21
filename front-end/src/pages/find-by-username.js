import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import ProfileList from "../components/profile-list";

const FindByUserName = () => {
    const [usernameQuery, setUsernameQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [profiles, setProfiles] = useState([]);

    const [aboveDivHeight, setAboveDivHeight] = useState(0);
    const aboveDivRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    // Extract the search query from the URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryFromUrl = params.get("searchUsername");

        if (queryFromUrl) {
            setUsernameQuery(queryFromUrl);
            fetchProfiles(queryFromUrl);
        } else {
            // reset when there's no query
            setProfiles([]);
            setUsernameQuery("");
        }
    }, [location.search]);

    const fetchProfiles = async (query) => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.github.com/search/users', {
                params: { q: query },
                headers: { 'Accept': 'application/vnd.github.v3+json' },
            });
            setProfiles(response.data.items);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (usernameQuery.trim() === "") return;
        navigate(`/find/username?searchUsername=${encodeURIComponent(usernameQuery)}`);
        // The useEffect will handle fetching
    };

    const updateHeight = () => {
        const height = aboveDivRef.current.offsetHeight;
        setAboveDivHeight(height);
    };

    useEffect(() => {
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    const belowDivStyle = {
        height: `calc(100% - ${aboveDivHeight}px)`,
    };

    return (
        <>
            <div className="find-frame" id="aboveDiv" ref={aboveDivRef}>
                <div className="navigation-buttons-group">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </button>
                    {profiles.length > 0 && (
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                navigate("/find/username");
                                localStorage.clear();
                                // Resets are handled in useEffect
                            }}
                        >
                            Clear
                        </button>
                    )}
                </div>

                <h2>Type in GitHub username you want to find:</h2>

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={usernameQuery}
                        placeholder="E.g: drakenevadie19"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={(e) => setUsernameQuery(e.target.value)}
                    />

                    <button
                        className="btn btn-success"
                        type="button"
                        id="button-addon2"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="profiles-display" id="belowDiv" style={{ ...belowDivStyle }}>
                {loading ? <h4>Loading...</h4> : <ProfileList profiles={profiles} />}
            </div>
        </>
    );
};

export default FindByUserName;


