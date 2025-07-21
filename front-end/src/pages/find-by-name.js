import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ProfileList from "../components/profile-list";
import axios from 'axios';

const FindByName = () => {
    const [nameQuery, setNameQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [profiles, setProfiles] = useState([]);
    
    const [aboveDivHeight, setAboveDivHeight] = useState(0);
    const aboveDivRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    // Automatically fetch if URL contains searchName
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryFromUrl = params.get("searchName");

        if (queryFromUrl) {
            setNameQuery(queryFromUrl);
            fetchProfiles(queryFromUrl);
        } else {
            setProfiles([]);
            setNameQuery("");
        }
    }, [location.search]);

    const fetchProfiles = async (query) => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.github.com/search/users', {
                params: { q: `${query} in:name` },
                headers: { 'Accept': 'application/vnd.github.v3+json' },
            });
            setProfiles(response.data.items);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (nameQuery.trim() === "") return;
        navigate(`/find/name?searchName=${encodeURIComponent(nameQuery)}`);
        // Fetching handled via useEffect
    };

    // Dynamically set height
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
                                navigate("/find/name");
                                // Resets handled via useEffect
                            }}
                        >
                            Clear
                        </button>
                    )}
                </div>

                <h2>Type in the name of the user you want to find:</h2>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="E.g: Thanh Nguyen Do"
                        value={nameQuery}
                        aria-label="Recipient's name"
                        aria-describedby="button-addon2"
                        onChange={(e) => setNameQuery(e.target.value)}
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
                {loading
                    ? <h4>Loading...</h4>
                    : <ProfileList profiles={profiles} />
                }
            </div>
        </>
    );
};

export default FindByName;
