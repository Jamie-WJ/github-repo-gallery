const overview= document.querySelector(".overview"); //div where profile information will appear//
const username= "Jamie-WJ";
const repoList= document.querySelector(".repo-list");//select the ul repo list//
const allRepos= document.querySelector(".repos"); //where all repo information appears//
const individualRepoData= document.querySelector(".repo-data"); //where individual repo data will appear//

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
        repoList.append(repoItem);
    } 
};

repoList.addEventListener("click", function(e) {
        if (e.target.matches("h3")){
            const repoName= e.target.innerText;
            getRepoInfo(repoName);
        }
    });

    //async function to get specific repo information//
    const getRepoInfo= async function(repoName) {
        const specificRepo= await fetch (`https://api.github.com/repos/${username}/${repoName}`);
        const repoResponse= await specificRepo.json();
        console.log(repoResponse);        

        const fetchLanguages= await fetch (`https://api.github.com/repos/Jamie-WJ/github-repo-gallery/languages`);
        const languageData= await fetchLanguages.json();
        console.log(languageData);

        const languages= [];
        for (const language in languageData) {
            languages.push(language);
        }  
        showRepoInfo(repoResponse, languages);

    };

    const showRepoInfo= function(repoResponse, languages) {
        individualRepoData.innerHTML="";
        individualRepoData.classList.remove("hide");
        allRepos.classList.add("hide");

        const div = document.createElement("div");
        div.innerHTML=`
        <h3>Name: ${repoResponse.name}</h3>
        <p>Description: ${repoResponse.description}</p>
        <p>Default Branch: ${repoResponse.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoResponse.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
        
        individualRepoData.append(div);
    };
