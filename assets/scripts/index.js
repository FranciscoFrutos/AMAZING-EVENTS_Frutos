function getAllEvents(event, cards) {
    appendEvent(event, cards)
}


createCategories(data);
createCard(data, "events", getAllEvents);

