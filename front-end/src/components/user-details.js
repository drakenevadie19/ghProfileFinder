import { useParams } from "react-router-dom";

const UserDetails = () => {
    // Link: http://localhost:3000/user-detail/drakene (:username = param)
    // => Get param from link
    const { username } = useParams();

    return (
        <h1>Here is {username} details page</h1>
    )
}

export default UserDetails;