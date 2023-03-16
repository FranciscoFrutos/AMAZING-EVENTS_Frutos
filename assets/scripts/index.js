async function getData() {
    const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    data = await response.json();
    createCategories(data);
    addEventFilters(data.events);
    createCards(data.events);
    
  }

getData()