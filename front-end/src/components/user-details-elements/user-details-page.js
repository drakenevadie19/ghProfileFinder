import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetailsPage = () => {
    // Link: http://localhost:3000/user-detail/drakene (:username = param)
    // => Get param from link => username = drakene
    const { username } = useParams();

    const [userFollowers, setUserFollowers] = useState([]);
    const [userFollowing, setUserFollowing] = useState([]);
    const [userRepos, setUserRepos] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getElements() {
            setLoading(true);
            
            try {
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

    console.log(userFollowers);
    console.log(userFollowing);
    console.log(userRepos);

    return (
        <>
            {
                !loading 
                ? <h1>Done fetching</h1>
                : <h1>Fail fetching</h1>
            }
        </>
    )
}

export default UserDetailsPage;