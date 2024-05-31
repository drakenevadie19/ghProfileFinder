import { useNavigate } from "react-router-dom";

const ProfileList = ({ profiles }) => {
    const navigate = useNavigate();
    const moveToUserDetail = (index) => {
        navigate(`/user-detail/${profiles[index].login}`);
    };

    return (
        <>
            <div className="display-profiles-frame">
                {profiles && profiles.length > 0 ? (
                <div className="display-profiles">
                    {profiles.map((github, key) => (
                    <div class="card" key={key}>
                        <img
                        src={github.avatar_url}
                        class="card-img-top"
                        alt="github"
                        />
                        <div class="card-body">
                        <h5 class="card-title">{github.login}</h5>
                        {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        <div className="card-button-groups">
                            <a class="btn btn-primary explore-button" onClick={() => moveToUserDetail(key)}>
                                Explore
                            </a>
                            <a
                            href={github.html_url}
                            class="btn btn-primary"
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
                )}
            </div>
        </>
    );
};

export default ProfileList;
