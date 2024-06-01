import ProfileList from "../profile-list";

const UserDetailsFollowers = ({ followers }) => {
    // console.log(followers);
    return (
        <>
            <ProfileList profiles={followers} />
        </>
    )
}

export default UserDetailsFollowers;