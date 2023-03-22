let data

function getCardTemplate(eventObject) {

    return `<div class="card text-light">
        <img src="${eventObject.image}" class="card-img" alt="...">
        <div class="card-img-overlay d-flex flex-column justify-content-between">
            <div>
                <h5 class="card-title fw-bold">${eventObject.name}</h5>
                <p class="card-text w-sm-75 ">${eventObject.description}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
            <span class="fw-bold">Price $${eventObject.price}</span>
            <a href="./details.html?id=${eventObject._id}" class="card-details fw-bold btn btn-dark">Details</a>
            </div>
        </div>
        
    </div>`;
}
function createID(text) {
    return text.toLowerCase().replace(/\s+/g, "-");
}

function isUpcomingEvent(event) {
    let currentDate = Date.parse(data.currentDate);
    let eventDate = Date.parse(event.date);
    return eventDate > currentDate
}

function createCategories(eventsData) {

    let categoriesElement = document.querySelector('#categories')

    let checks = ''
    let rawCategoriesList = eventsData.events.map(element => element.category)
    let categories = new Set(rawCategoriesList)
    categories.forEach(category =>{
        checks += `<div>
        <input type="checkbox" id="category-${createID(category)}" value="${createID(category)}">
        <label for="category-${createID(category)}">${category}</label>
    </div>`
    })
    categoriesElement.innerHTML = checks
}



function createCards(eventsData) {
    let htmlElement = document.getElementById('events')
    if(eventsData.length == 0){
        htmlElement.innerHTML = '<p>No events found.</p>'
        return
    }
    let cards = ''
    eventsData.forEach(element => {
        cards += getCardTemplate(element);
        
    })
    htmlElement.innerHTML = cards
    
}

/* Manejo de filtros */

function filters(eventsData){
    let input = document.querySelector('#searchInput')
    let searchFilter = filterBySearch(eventsData, input.value)
    let categoryFilter = filterByCategory(searchFilter)
    createCards(categoryFilter)
}

function addEventFilters(eventsData){
    let input = document.querySelector('#searchInput')
    let checkboxes = document.getElementById("categories");
    input.addEventListener('input',filters.bind(null, eventsData))
    checkboxes.addEventListener('change',filters.bind(null, eventsData))
}

function filterBySearch(eventsData, searchInput){
    let filteredEventData = eventsData.filter(element => element.name.toLowerCase().includes(searchInput.toLowerCase()))
    return filteredEventData
}

function filterByCategory(eventsData){
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkboxes)
    let checkedChecks = arrayChecks.filter(check => check.checked)
    if(checkedChecks.length == 0){
        return eventsData
    }
    let checkValues = checkedChecks.map(check => check.value)
    let filteredList = eventsData.filter(element => checkValues.includes(createID(element.category)))
    return filteredList
}

/* index.html */

async function getData() {
    const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    data = await response.json();
    createCategories(data);
    addEventFilters(data.events);
    createCards(data.events);
    
  }

getData()
