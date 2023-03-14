function isPastEvent(event) {
    let currentDate = Date.parse(data.currentDate);
    let eventDate = Date.parse(event.date);
    return eventDate > currentDate
}

let filteredEvents = data.events.filter(event => isPastEvent(event))

createCategories(data);
addEventFilters(filteredEvents);
createCards(filteredEvents);