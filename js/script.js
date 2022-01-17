const overview= document.querySelector(".overview"); //div where profile information will appear//
const username= "Jamie-WJ";
const reposList= document.querySelector(".repo-list");//select the ul repo list//

const gitHubInfo= async function (){
    const userInfo= await fetch (`https://api.github.com/users/${username}`);
    const data= await userInfo.json ();

  displayUserInfo(data);
};

gitHubInfo();

const displayUserInfo = function (data){
    const div = document.createElement("div");
            div.classList.add("user-info");
            div.innerHTML=`
            <figure>
                <img alt="user avatar" src=${data.avatar_url}/>
            </figure>
            
            <div>
                <p><strong>Name:</strong>  ${data.name}</p>
                <p><strong>Bio:</strong>  ${data.bio}</p>
                <p><strong>Location:</strong>  ${data.location}</p>
                <p><strong>Number of public repos:</strong>  ${data.public_repos}</p>
            </div>`;

            overview.append(div);
            gitHubRepos();
};

const gitHubRepos = async function(){
    const fetchRepos= await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData= await fetchRepos.json();

    repoInfo(repoData);

};

const repoInfo= function (repos){
    for (const repo of repos) {
        const repoItem= document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML=`<h3>${repo.name}</h3>`;
        reposList.append(repoItem);
    }
};