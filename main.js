const container = document.getElementById("container");

function requestUserRepos(username, page=1) {
    return Promise.resolve(
        fetch(`https://api.github.com/users/${username}/repos?page=${page}`)
    );
}

async function getAllUserRepos(username) {
    let page = 1;
    let repos = [];

    while (true) {
        const response = await requestUserRepos(username, page);
        const data = await response.json();

        if (data.length === 0) {
            break;
        }
        repos = repos.concat(data);
        page++;
    }
    return repos;
}

username = prompt("Enter the username: ");
getAllUserRepos(username)
    .then((data) => {
        for (let i in data) {
            const githubContainerChild = document.createElement("div");
            githubContainerChild.classList.add("container-child");
            
            const githubContainerChildName = document.createElement("div");
            githubContainerChildName.classList.add("container-child-name");
            githubContainerChildName.textContent = data[i].name;
            githubContainerChild.appendChild(githubContainerChildName);

            const githubContainerChildDescription = document.createElement("div");
            githubContainerChildDescription.classList.add("container-child-description");
            githubContainerChildDescription.textContent = data[i].description;
            githubContainerChild.appendChild(githubContainerChildDescription);
            
            const githubContainerChildURL = document.createElement("div");
            githubContainerChildURL.classList.add("container-child-url");
            githubContainerChildURL.textContent = data[i].html_url;
            githubContainerChild.appendChild(githubContainerChildURL);

            container.appendChild(githubContainerChild);
        }
    });
