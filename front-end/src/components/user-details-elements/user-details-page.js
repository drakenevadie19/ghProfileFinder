import { useParams } from "react-router-dom";

const UserDetailsPage = () => {
    // Link: http://localhost:3000/user-detail/drakene (:username = param)
    // => Get param from link => username = drakene
    const { username } = useParams();

    return (
        <h1>Here is {username} details page</h1>
    )
}

export default UserDetailsPage;