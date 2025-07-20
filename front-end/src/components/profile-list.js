import { useNavigate } from "react-router-dom";

const ProfileList = ({ profiles }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="display-profiles-frame">
                {
                    profiles && profiles.length > 0 
                    ? (
                        <div className="display-profiles">
                            {
                                profiles.map((github, key) => (
                                <div className="card" key={key}>
                                    <img
                                    src={github.avatar_url}
                                    className="card-img-top"
                                    alt="github"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{github.login}</h5>
                                        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                        <div className="card-button-groups">
                                            <button className="btn btn-info explore-button" onClick={() => navigate(`/user-detail/${github.login}`)}>
                                                Explore
                                            </button>
                                            <a
                                            href={github.html_url}
                                            className="btn btn-warning"
                                            target="_blank"
                                            rel="noreferrer"
                                            >
                                                Go to Github
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h4>
                            <i>No match Github profiles to display</i>
                        </h4>
                    )
                }
            </div>
        </>
    );
};

export default ProfileList;
