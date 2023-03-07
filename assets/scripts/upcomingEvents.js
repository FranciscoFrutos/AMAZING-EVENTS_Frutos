function getUpcomingEvents(event, cards) {

    let currentDate = Date.parse(data.currentDate);
    let eventDate = Date.parse(event.date);
    if (eventDate > currentDate) {
        appendEvent(event, cards)
    }
}


createCard(data, "events-upcoming", getUpcomingEvents);

createCategories(data)
