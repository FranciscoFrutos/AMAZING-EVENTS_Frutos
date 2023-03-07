function getPastEvents(event, cards) {

    let currentDate = Date.parse(data.currentDate);
    let eventDate = Date.parse(event.date);
    if (eventDate > currentDate) {
        appendEvent(event, cards)
    }
}


createCategories(data);
createCard(data, "events-past", getPastEvents);