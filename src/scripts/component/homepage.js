// Curt

function populateHomepage () {
    let homepageContainer = document.querySelector("#container")
    homepageContainer.innerHTML = `
    <div id="mainHomepageDiv">
    <h1>Bitchin. It's a homepage</h1>
    <section id="eventsSection"></section>
    <section id="tasksSection"></section>
    <section id="newsSection"></section>
    <section id="friendsSection"></section>
    </div>
    `
}

export { populateHomepage }