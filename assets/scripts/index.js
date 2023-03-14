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
createCategories(data);

addEventFilters(data.events);
createCards(data.events);