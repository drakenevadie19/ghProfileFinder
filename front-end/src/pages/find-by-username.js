import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ProfileList from "../components/profile-list";

const FindByUserName = () => {
    const [usernameQuery, setUsernameQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [profiles, setProfiles] = useState([]);

    const [aboveDivHeight, setAboveDivHeight] = useState(0);
    const aboveDivRef = useRef(null);

    const handleSearch = async () => {
        setLoading(true);

        try {
            const response = await axios.get('https://api.github.com/search/users', {
                params: { q: usernameQuery },
                headers: { 'Accept': 'application/vnd.github.v3+json' },
            });
            setProfiles(response.data.items);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    console.log(profiles);

    const navigate = useNavigate();

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
                {profiles.length>0 &&
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            setProfiles([]);
                            setUsernameQuery("")
                        }}
                    >
                        Clear
                    </button>
                }
            </div>
            
            
            <h2>Type in Github username you want to find to search:</h2>

            <div class="input-group mb-3">
                <input
                type="text"
                class="form-control"
                value={usernameQuery}
                placeholder="E.g: drakenevadie19"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                onChange={(e) => setUsernameQuery(e.target.value)}
                />
                
                <button 
                class="btn btn-primary" 
                type="button" 
                id="button-addon2"
                onClick={() => handleSearch()}
                disabled={loading}
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

export default FindByUserName;
