
const UserDetailsRepos = ({ repos }) => {
// console.log(window.location.pathname);

  return(
    <>
      <div className="display-profiles-frame">
        {repos && repos.length > 0 ? (
          <div className="display-profiles">
            {repos.map((repo, key) => (
              <div className="card" key={key}>
                <img
                  src="/images/repo-default-image.png"
                  className="card-img-top repo-img"
                  alt="GitHub Repo"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {repo.name}
                    {repo.fork === true && (
                      <span className="badge text-bg-success">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="azure"
                          className="bi bi-diagram-2 fork-badge"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 5 7h2.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM3 11.5A1.5 1.5 0 0 1 4.5 10h1A1.5 1.5 0 0 1 7 11.5v1A1.5 1.5 0 0 1 5.5 14h-1A1.5 1.5 0 0 1 3 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 9 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"
                          />
                        </svg>
                      </span>
                    )}
                  </h5>
                  {repo.description !== "" && <p>{repo.description}</p>}
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <div className="card-button-groups">
                    <a
                      href={repo.html_url}
                      className="btn btn-primary"
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
}

export default UserDetailsRepos;