const container = document.getElementById("container");

function requestUserRepos(username){
    return Promise.resolve(fetch(`https://api.github.com/users/${username}/repos`));
}
username = prompt("Enter the username: ");
requestUserRepos(username)
    .then(response => response.json())
    .then(data => {
        for (let i in data) {
            const githubContainerChild = document.createElement("div");
            githubContainerChild.classList.add("container-child");
            
            
            const githubContainerChildName = document.createElement("div");
            githubContainerChildName.classList.add("container-child-name");
            githubContainerChildName.textContent = data[i].name;

            const githubContainerChildDescription = document.createElement("div");
            githubContainerChildDescription.classList.add("container-child-description");
            githubContainerChildDescription.textContent = data[i].description;

            
            const githubContainerChildURL = document.createElement("div");
            githubContainerChildURL.classList.add("container-child-url");
            githubContainerChildURL.textContent = data[i].html_url;

            githubContainerChild.appendChild(githubContainerChildName);
            githubContainerChild.appendChild(githubContainerChildDescription);
            githubContainerChild.appendChild(githubContainerChildURL);


            container.appendChild(githubContainerChild);
        }
    });
