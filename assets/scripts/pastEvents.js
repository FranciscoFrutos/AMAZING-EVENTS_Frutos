function isPastEvent(event) {
    let currentDate = Date.parse(data.currentDate);
    let eventDate = Date.parse(event.date);
    return eventDate < currentDate
}

async function getData() {
    const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    data = await response.json();
    let filteredEvents = data.events.filter(event => isPastEvent(event))
    createCategories(data);
    addEventFilters(filteredEvents);
    createCards(filteredEvents);   
  }

getData()