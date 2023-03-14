function createID(text) {
    return text.toLowerCase().replace(/\s+/g, "-");
}

function getCategoriesList(dataList) {

    let categoriesList = new Array();
    dataList.events.forEach(event => {
        if (!categoriesList.includes(event.category)) {
            categoriesList.push(event.category);
        };
    });
    return categoriesList;
}

function createCategories(eventsData) {

    let categories = document.getElementById("categories");
    let categoriesList = getCategoriesList(eventsData);
    categoriesList.forEach(category => {
        let checkbox = `<div>
            <input type="checkbox" name="${createID(category)}" id="category-${createID(category)}">
            <label for="category-${createID(category)}">${category}</label>
        </div>`

        categories.innerHTML += checkbox;
    });
}


function getCardTemplate(event) {

    return `<div class="card text-center" style="width: 18rem;">
        <img src="${event.image}" class="card-img-top h-50 object-fit-cover p-3" alt="...">
        <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
        </div>
        <div class="card-footer">
            <div class="d-flex justify-content-between align-items-center">
                <span>Price $${event.price}</span>
                <a href="./details.html?id=${event._id}" class="btn btn-outline-light">Details</a>
            </div>
        </div>
    </div>`;
}

function createCards(eventsList, selectedCategories = []) {
    let htmlElement = document.getElementById('events');
    htmlElement.innerHTML = '';
    let filteredEvents = eventsList.filter(event =>
        selectedCategories.length === 0
        || selectedCategories.includes(event.category));
    filteredEvents.forEach(element => {
        let cardTemplate = getCardTemplate(element);
        htmlElement.innerHTML += cardTemplate;
    });
}

/* Manejo de filtros */



function getSelectedCategories() {
    let selectedCategories = getCategoriesList(data).filter(category => {
        let checkboxElement = document.querySelector(`#category-${createID(category)}`);
        return checkboxElement.checked;
    });
    return selectedCategories;
}

function a() {
 
}




function addEventFilters(data) {
    const categoryInputs = document.querySelectorAll('#categories input');

    categoryInputs.forEach(input => {
        input.addEventListener('change', function () {
            let selectedCategories = getSelectedCategories()
            console.log("selectedcategories");
            console.log(selectedCategories);
            createCards(data, selectedCategories);
        });
    });

    let searchInput = document.querySelector('#searchInput')
    let searchButton = document.querySelector('#searchSubmit')
    searchButton.addEventListener('click', function (event) {
        event.preventDefault();
        let htmlElement = document.getElementById('events');
        let searchText = searchInput.value;
        let selectedCategories = getSelectedCategories();
        let filteredEvents = data.filter(event =>
            (selectedCategories.length === 0 || selectedCategories.includes(event.category))
            && (searchText.length === 0 || event.name.toLowerCase().includes(searchText.toLowerCase()))
        );
        if (filteredEvents.length === 0) {
            htmlElement.innerHTML = '<p>No events found.</p>';
        } else {
            createCards(filteredEvents);
        }
    });
}

