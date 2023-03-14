const detailsCard = document.getElementById('details-card')
const querySearch = window.location.search
const param = new URLSearchParams(querySearch).get("id")
const eventObject = data.events.find(event => event._id == param)

if(eventObject){
        console.log(detailsCard.innerHTML);
        detailsCard.innerHTML = `
        <img src="${eventObject.image}" alt="..." class="details-card-img">
        <div class="details-card-body">
            <h5 class="details-card-title">${eventObject.name}</h5>
            <p class="details-card-text">
                <p><span class="bold">Category: </span> ${eventObject.category}</p>
                <p><span class="bold">Description: </span> ${eventObject.description}</p>
                <p><span class="bold">Place: </span> ${eventObject.place}</p>
                <p><span class="bold">Date: </span> ${eventObject.date}</p>
                <p><span class="bold">Capacity: </span> ${eventObject.capacity}</p>
                <p><span class="bold">Assistance: </span> ${eventObject.assistance}</p>
                <p><span class="bold">Price: </span> ${eventObject.price}</p>
            </p>
        </div>
    `
    }else{
        detailsCard.innerHTML = `
            <h2>Empty<h2>
        `
    }