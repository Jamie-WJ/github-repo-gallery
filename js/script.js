
const overview= document.querySelector(".overview"); //Div where profile information will appear.//
const username= "Jamie-WJ";
const repoList= document.querySelector(".repo-list");//Selects the ul repo list.//
const allRepos= document.querySelector(".repos"); //Where all repo information appears.//
const individualRepoData= document.querySelector(".repo-data"); //Where individual repo data will appear.//
const backToRepo=document.querySelector('.view-repos');//The button will return the user back to the repo gallery.//
const filterInput=document.querySelector('.filter-repos');//Selects the "Search by name" placeholder.//


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

//This function displays all of my repos.//
const repoInfo= function (repos){
    filterInput.classList.remove("hide");
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
    //This function is responsible for displaying the individual repo info.//
    const showRepoInfo= function(repoResponse, languages) {
        individualRepoData.innerHTML="";
        individualRepoData.classList.remove("hide");
        allRepos.classList.add("hide");
        backToRepo.classList.remove("hide");


        const div = document.createElement("div");
        div.innerHTML=`
        <h3>Name: ${repoResponse.name}</h3>
        <p>Description: ${repoResponse.description}</p>
        <p>Default Branch: ${repoResponse.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoResponse.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
        
        individualRepoData.append(div);
    };

    backToRepo.addEventListener("click", function(){
       allRepos.classList.remove("hide");
       individualRepoData.classList.add("hide");
       backToRepo.classList.add("hide");
    });