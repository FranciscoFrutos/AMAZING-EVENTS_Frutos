let data

function getCardTemplate(eventObject) {

    return `<div class="card text-center" style="width: 18rem;">
        <img src="${eventObject.image}" class="card-img-top h-50 object-fit-cover p-3" alt="...">
        <div class="card-body">
            <h5 class="card-title">${eventObject.name}</h5>
            <p class="card-text">${eventObject.description}</p>
        </div>
        <div class="card-footer">
            <div class="d-flex justify-content-between align-items-center">
                <span>Price $${eventObject.price}</span>
                <a href="./details.html?id=${eventObject._id}" class="btn btn-outline-light">Details</a>
            </div>
        </div>
    </div>`;
}
function createID(text) {
    return text.toLowerCase().replace(/\s+/g, "-");
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



function createCards(eventsData, selectedCategories = []) {
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
    let searchButton = document.querySelector('#searchSubmit')
    let input = document.querySelector('#searchInput')
    let checkboxes = document.getElementById("categories");
    input.addEventListener('input',filters.bind(null, eventsData))
    searchButton.addEventListener('click', function(event){
        event.preventDefault();
    })
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


