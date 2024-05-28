import { useNavigate } from "react-router-dom";

const FindByName = () => {
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
                <h2>Type in name of user you want to find to search:</h2>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="E.g: Thanh Nguyen Do" aria-label="Recipient's name" aria-describedby="button-addon2" />
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                </div>
            </div>
        </>
    )
}

export default FindByName;