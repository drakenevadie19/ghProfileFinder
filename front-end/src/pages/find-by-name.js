import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ProfileList from "../components/profile-list";

const FindByName = () => {
    const [nameQuery, setNameQuery] = useState("");
    
    const [aboveDivHeight, setAboveDivHeight] = useState(0);
    const aboveDivRef = useRef(null);


    const handleSearch = (nQuery) => {
        alert(nQuery);
    }

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
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate("/")}
            >
                Back to Home
            </button>
            <h2>Type in name of user you want to find to search:</h2>
            <div class="input-group mb-3">
                <input
                type="text"
                class="form-control"
                placeholder="E.g: Thanh Nguyen Do"
                aria-label="Recipient's name"
                aria-describedby="button-addon2"
                onChange={(e) => setNameQuery(e.target.value)}
                />
                <button 
                class="btn btn-primary" 
                type="button" 
                id="button-addon2"
                onClick={() => handleSearch(nameQuery)}
                >
                Search
                </button>
            </div>
        </div>

        <div className="profiles-display" id="belowDiv" style={{ ...belowDivStyle }}>
            <ProfileList />
        </div>
    </>
    );
};

export default FindByName;
