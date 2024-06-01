import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserDetailsRepos from "./user-details-repos";
import UserDetailsFollowers from "./user-details-followers";
import UserDetailsFollowing from "./user-details-following";
import ProfileList from "../profile-list";

const UserDetailsPage = () => {
    // Link: http://localhost:3000/user-detail/drakene (:username = param)
    // => Get param from link => username = drakene
    const { username } = useParams();

    const [userProfile, setUserProfile] = useState({});
    const [userFollowers, setUserFollowers] = useState([]);
    const [userFollowing, setUserFollowing] = useState([]);
    const [userRepos, setUserRepos] = useState([]);

    const [currentDisplaying, setCurrentDisplaying] = useState("");

    const [loading, setLoading] = useState(false);

    const [aboveDivHeight, setAboveDivHeight] = useState(0);
    const aboveDivRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        setCurrentDisplaying("Repo");
        async function getElements() {
            setLoading(true);
            
            try {
                // Get user's profile for displaying
                const response0 = await axios.get(`https://api.github.com/users/${username}`);
                // console.log(response0);  
                if (response0.status === 200) setUserProfile(response0.data);

                // Get user's followers list and save to userFollowers array
                const response1 = await axios.get(`https://api.github.com/users/${username}/followers`);
                if (response1.status === 200) setUserFollowers(response1.data);

                // Get user's follwing list and save to userFollowers array
                const response2 = await axios.get(`https://api.github.com/users/${username}/following`);
                if (response1.status === 200) setUserFollowing(response2.data);

                // Get user's repos list and save to userRepos array
                const response3 = await axios.get(`https://api.github.com/users/${username}/repos`);
                if (response1.status === 200) setUserRepos(response3.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getElements();
    }, []);

    // console.log(userProfile);
    // console.log(userFollowers);
    // console.log(userFollowing);
    // console.log(userRepos);

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

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
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
                    <a
                        className="btn btn-primary"
                        href={document.referrer}
                    >
                        Previous Page
                    </a>
                </div>

                <div className="user-detail-headline-wrap">
                    {/* Bio-headline */}
                    <div className="user-detail-headline">
                        {/* Bio-image */}
                        <div className="user-detail-headline-image-wrap">
                            <img className="user-detail-headline-image" src={userProfile.avatar_url} alt="profile" />
                        </div>

                        {/* Bio-details */}
                        <div className="user-detail-headline-info-wrap">
                            <div className="user-detail-headline-username-and-other-details username">
                                <h2><strong><i>{userProfile.login}</i></strong></h2>
                                <a href={userProfile.html_url} target="_blank" rel="noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                                        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
                                    </svg>
                                </a>
                            </div>
                            
                            {
                                userProfile.name  &&
                                <div className="user-detail-headline-username-and-other-details">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                        </svg>
                                    </span>
                                    <h5>{userProfile.name}</h5>
                                </div>
                            }
                            <div className="user-detail-headline-bio-location-wrap">
                                {
                                    userProfile.location  &&
                                    <div className="user-detail-headline-username-and-other-details">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                            </svg>
                                        </span>
                                        <h5>{userProfile.location}</h5>
                                    </div>
                                }

                                {
                                    userProfile.company  &&
                                    <div className="user-detail-headline-username-and-other-details">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
                                                <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                                                <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"/>
                                            </svg>
                                        </span>
                                        <h5>{userProfile.company}</h5>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="user-detail-repos-follower-following-wrap" id="belowDiv" style={{ ...belowDivStyle }}>
                <div className="user-detail-r-f--navbar">
                    <div className="user-detail-r-f--navbar-tab" onClick={() => setCurrentDisplaying("Repo")}>
                        <p className="user-detail-r-f--navbar-tab-name">Repositories</p> 
                        <p className="user-detail-r-f--navbar-tab-number"><strong>{userProfile.public_repos}</strong></p>
                    </div> 
                    <div className="user-detail-r-f--navbar-tab" onClick={() => setCurrentDisplaying("Follower")}>
                        <p className="user-detail-r-f--navbar-tab-name">Followers</p> 
                        <p className="user-detail-r-f--navbar-tab-number"><strong>{userProfile.followers}</strong></p>
                    </div> 
                    <div className="user-detail-r-f--navbar-tab" onClick={() => setCurrentDisplaying("Following")}>
                        <p className="user-detail-r-f--navbar-tab-name">Following</p> 
                        <p className="user-detail-r-f--navbar-tab-number"><strong>{userProfile.following}</strong></p>
                    </div>
                </div>

                <div className="user-detail-r-f--display">
                {/* <div className="profiles-display"> */}
                {/* <div> */}
                    {
                        currentDisplaying === "Repo" && 
                        <UserDetailsRepos repos={userRepos} />
                    }

                    {
                        currentDisplaying === "Follower" && 
                        <UserDetailsFollowers followers={userFollowers} />
                    }

                    {
                        currentDisplaying === "Following" && 
                        <UserDetailsFollowing following={userFollowing} />
                    }
                </div>
            </div>
        </>
    )
}

export default UserDetailsPage;