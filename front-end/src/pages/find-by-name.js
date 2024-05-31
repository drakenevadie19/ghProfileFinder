import { useNavigate } from "react-router-dom";
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

    // setting dynamically height of profiles displaying div
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

    // Handling fetch API
    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.github.com/search/users', {
                params: { q: `${nameQuery} in:name` },
                headers: { 'Accept': 'application/vnd.github.v3+json' },
            });
            setProfiles(response.data.items);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

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
                {profiles.length>0 &&
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            setProfiles([]);
                            setNameQuery("")
                        }}
                    >
                        Clear
                    </button>
                }
            </div>

            <h2>Type in name of user you want to find to search:</h2>
            <div class="input-group mb-3">
                <input
                type="text"
                class="form-control"
                placeholder="E.g: Thanh Nguyen Do"
                value={nameQuery}
                aria-label="Recipient's name"
                aria-describedby="button-addon2"
                onChange={(e) => setNameQuery(e.target.value)}
                />
                <button 
                class="btn btn-primary" 
                type="button" 
                id="button-addon2"
                onClick={() => handleSearch()}
                >
                Search
                </button>
            </div>
        </div>

        <div className="profiles-display" id="belowDiv" style={{ ...belowDivStyle }}>
        {
                loading
                ? <h4>Loading...</h4>
                :<ProfileList profiles={profiles} />
            }
        </div>
    </>
    );
};

export default FindByName;
