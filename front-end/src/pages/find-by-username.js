import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FindByUserName = () => {
    const [usernameQuery, setUsernameQuery] = useState("");

    const handleSearch = (unQuery) => {
        alert(unQuery);
    }
    
    const navigate = useNavigate();

    return (
    <>
        <div className="find-frame">
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate("/")}
            >
                Back to Home
            </button>
            <h2>Type in Github username you want to find to search:</h2>

            <div class="input-group mb-3">
                <input
                type="text"
                class="form-control"
                placeholder="E.g: drakenevadie19"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                onChange={(e) => setUsernameQuery(e.target.value)}
                />
                
                <button 
                class="btn btn-primary" 
                type="button" 
                id="button-addon2"
                onClick={() => handleSearch(usernameQuery)}
                >
                Search
                </button>
            </div>
        </div>
    </>
    );
};

export default FindByUserName;
