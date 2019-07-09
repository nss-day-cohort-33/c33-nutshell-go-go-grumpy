// Curt
// import { listArticles } from "./new.js";
import { getNewsData } from "../api-handler/new-handler.js";
import { getEventsData } from "../api-handler/event-handler.js";
import { getTaskData } from "../api-handler/task-handler.js"

let homepageContainer = document.querySelector("#container");

function populateHomepage() {
    let currentUserId = sessionStorage.getItem("userId");
  homepageContainer.innerHTML = `
    <div id="mainHomepageDiv">
        <h1> It's a homepage</h1>
        <section id="eventsSection">
            <h2>Check out your events</h2>
        </section>
        <section id="tasksSection">
            <h2>Check out your tasks</h2>

        </section>
        <section id="newsSection">
            <h2>Check out your articles</h2>
        </section>
    </div>
    `;
    getNewsData(currentUserId).then(articles => {
      console.log(articles);
      for (let i = 0; i < articles.length; i++) {
        let articlesArr = articles[i]
        document.querySelector("#newsSection").innerHTML += newsDisplay(articlesArr)
      }
    });
    getEventsData(currentUserId).then(events => {
        console.log(events)
        for (let i=0; i<events.length; i++) {
            let eventsArr = events[i]
            document.querySelector("#eventsSection").innerHTML += eventsDisplay(eventsArr)
        }
    })
    getTaskData(currentUserId).then(tasks => {
        console.log(tasks)
        for (let i=0; i<tasks.length; i++) {
            let tasksArr = tasks[i]
            document.querySelector("#tasksSection").innerHTML += tasksDisplay(tasksArr)
        }
    })
}


function newsDisplay(articlesArr) {
  let newsDiv = `
        <article>
            <h3>${articlesArr.name}</h3>
            <p>${articlesArr.summary}</p>
            <a href=${articlesArr.url}>News Article Link</a>
        </article>
    `;
  return newsDiv;
}

function eventsDisplay(eventsArr) {
    let eventsDiv = `
    <article>
            <h3>${eventsArr.name}</h3>
            <p>${eventsArr.date}</p>
            <p>${eventsArr.location}</p>
        </article>
    `
    return eventsDiv
}

function tasksDisplay(tasksArr) {
    let tasksDiv = `
    <article>
            <h3>${tasksArr.newTaskEntry}</h3>
            <p>${tasksArr.date}</p>
            <p>${tasksArr.completedTask}</p>
        </article>
    `
    return tasksDiv
}

export { populateHomepage };
