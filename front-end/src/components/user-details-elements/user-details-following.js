import ProfileList from "../profile-list";

const UserDetailsFollowing = ({ following }) => {
    // console.log(following);
    return (
        <>
            <ProfileList profiles={following} />
        </>
    )
}

export default UserDetailsFollowing;