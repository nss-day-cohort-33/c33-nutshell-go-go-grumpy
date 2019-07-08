// Curt

import {
  getNewsData,
  postNewsData,
  deleteNews,
  putNewsData
} from "../api-handler/new-handler";


//get data from DB
function createArticleForm() {
    getNewsData().then(articles => listArticles(articles));
    // Create the news form to input data
    let newsContainer = document.querySelector("#container");
    newsContainer.innerHTML = `
    <fieldset>
    <label for="newsTitle">Article Title</label>
    <input type="text" name="newsTitle" id="articleTitle">
    </fieldset>
    <fieldset>
    <label for="newsSummary">Summary</label>
    <input type="textfield" name="newsSummary" id="articleSummary">
    </fieldset>
    <fieldset>
    <label for="newsURL">Article URL</label>
    <input type="text" name="newsURL" id="URL">
    </fieldset>
    <button id="saveNews" type="button">Save Article</button>
    <div id="displayNews"></div>
    `;
}

//listener for user input
function newsListener() {
    document.querySelector("#saveNews").addEventListener("click", () => {
        console.log("clicked");
        let createTitle = document.querySelector("#articleTitle").value;
        let createSummary = document.querySelector("#articleSummary").value;
        let createURL = document.querySelector("#URL").value;
        let newNews = newsFactory(createTitle, createSummary, createURL);
        postNewsData(newNews).then(() => {
            getNewsData().then(articles => listArticles(articles));
        });
    });
}

//Factory function to format data for DB
function newsFactory(name, summary, url) {
    return {
        name: name,
        summary: summary,
        url: url
    };
}

function displayNewsArticles(articles) {
    let el = document.createElement("div");
    let div = document.createElement("div");
    let section = document.createElement("section");
    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let articleContainer = document.querySelector("#displayNews");
    section.innerHTML = `
        <section id= "${articles.id}">
        <h2>${articles.name}</h2>
        <article>
            <p>${articles.summary}</p>
            <p>${articles.url}</p>
        </article>
        </section>
        <div id="editField-${articles.id}"></div>
    `;
  el.appendChild(section);
  div.setAttribute("id", `newsContainer-${articles.id}`);
  deleteBtn.setAttribute("id", `${articles.id}`);
  deleteBtn.textContent = "Delete";
  editBtn.setAttribute("id", `${articles.id}`)
  editBtn.textContent = "Edit"
  editBtn.addEventListener("click", () => {
    console.log("event")
    createEditForm(articles)
  })
  deleteBtn.addEventListener("click", () => {
    let id = event.target.id;
    deleteNews(id).then(data => {
      console.log(data);
      articleContainer.innerHTML = "";
      getNewsData().then(articles => listArticles(articles));
    });
  });
  el.appendChild(div);
  el.appendChild(deleteBtn);
  el.appendChild(editBtn);
  return el;
}


//get articles from the DB
const listArticles = articleArr => {
  let articleDisplay = document.querySelector("#displayNews");
  document.querySelector("#displayNews").innerHTML = "";
  articleArr.forEach(article => {
    articleDisplay.appendChild(displayNewsArticles(article));
  });
};

//Edit form function
function createEditForm (article) {
  let newsContainer = document.querySelector(`#editField-${article.id}`);
    newsContainer.innerHTML = `
    <fieldset>
    <label for="newsTitle">Article Title</label>
    <input type="text" class="title" name="newsTitle" id="articleTitle" value=${article.name}>
    </fieldset>
    <fieldset>
    <label for="newsSummary">Summary</label>
    <input type="text" class="summary" name="newsSummary" id="articleSummary" value=${article.summary}>
    </fieldset>
    <fieldset>
    <label for="newsURL">Article URL</label>
    <input type="text" class="url" name="newsURL" id="URL" value=${article.url}>
    </fieldset>
    <button id="saveChanges-${article.id}" type="button">Save Changes</button>
    <button id="cancelEdit-${article.id}" type="button">Cancel Changes</button>
    <div id="displayEditForm"></div>
    `
function createCancelEditBtn () {
  let cancelBtn = document.querySelector(`#cancelEdit-${article.id}`)
  cancelBtn.addEventListener("click", () => {
    let cancelId = event.target.id.split("-")[1]
    console.log(cancelId)
    let clearEditField = document.querySelector(`#editField-${article.id}`)
    clearEditField.innerHTML = ""
  })
}

createCancelEditBtn()

createSaveChangesBtn()

function createSaveChangesBtn() {
    let saveEditBtn = document.querySelector(`#saveChanges-${article.id}`)
    saveEditBtn.addEventListener("click", () => {
      let id = event.target.id.split("-")[1]
      console.log(event)
      console.log(id)
      let editTitle = document.querySelector(".title").value;
      let editSummary = document.querySelector(".summary").value;
      let editURL = document.querySelector(".url").value;
      console.log(editTitle)
      console.log(editSummary)
      console.log(editURL)
      let editedNews = newsFactory(editTitle, editSummary, editURL);
      putNewsData(editedNews, id).then(() => {
        getNewsData().then(articles => listArticles(articles));
        console.log("save changes")
      })
    })
  }
}




export { createArticleForm, newsListener };