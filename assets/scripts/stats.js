let pastEvents
let upcomingEvents
async function getData() {
    const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    data = await response.json();
    let events = data.events
    upcomingEvents = events.filter(event => isUpcomingEvent(event))  
    pastEvents = events.filter(event => !isUpcomingEvent(event))  
    fillTable()
  }


function getEventStats(eventsList){
    let assistance = eventsList[0].estimate || eventsList[0].assistance
    console.log(assistance);
    let attendance = (assistance/eventsList[0].capacity)*100
    let statsObject = {
        highestAttendance: {'name': eventsList[0].name, 'attendance': attendance},
        lowestAttendance: {'name': eventsList[0].name, 'attendance': attendance},
        largerCapacity: {'name': eventsList[0].name, 'capacity': eventsList[0].capacity},
        events: []
    }
    eventsList.forEach(element => {
        let categoryObject = {};
        let assistance = element.assistance || element.estimate
        let attendance = (assistance /element.capacity)*100;
        categoryObject['category'] = element.category;
        categoryObject['revenue'] = assistance;
        categoryObject['attendance'] = attendance;
        categoryObject['count'] = 1;

        if (attendance > statsObject.highestAttendance.attendance) {
            statsObject.highestAttendance = { name: element.name, attendance };          
        }
        if (attendance < statsObject.lowestAttendance.attendance) {
            statsObject.lowestAttendance = { name: element.name, attendance };
        }
        if ((element.capacity > statsObject.largerCapacity.capacity)) {
            statsObject.largerCapacity = { name: element.name, capacity: element.capacity };
        }

        statsObject.events.push(categoryObject);
    });
    return statsObject
}

function getEventStatsByCategory(statsList){

    let arrayOfCategories = []
    statsList.events.forEach( element => {
        const isInArray = arrayOfCategories.find((element2) => {
            return element2.category === element.category
        })
        if (isInArray) { 
            let index = arrayOfCategories.findIndex(((element2) => {
                return element2.category === element.category
            } ))
            arrayOfCategories[index].revenue += element.revenue;
            arrayOfCategories[index].attendance += element.attendance;
            arrayOfCategories[index].count ++;
        } else {
            arrayOfCategories.push(element)
        }
    } )

    statsList.events = arrayOfCategories
    return statsList;
}


function printEventsStatsByCategory(htmlElement, eventStats){
    let eventsStatsElement = document.querySelector(htmlElement)
    let row = '';
    let categoriesArray = getEventStatsByCategory(eventStats)
    
    categoriesArray.events.forEach(element => {
        row += `
        <tr>
            <td>${element.category}</td>
            <td>${element.revenue}</td>
            <td>${((element.attendance/element.count)).toFixed(2) + ' %'}</td>
        </tr>     
        `
    });
    eventsStatsElement.innerHTML = row;  
}
function printEventsStats(){
    let pastEventsStatsElement = document.querySelector('#event-stats')
    let row = '';
    let pastStatsData = getEventStatsByCategory(getEventStats(pastEvents))  
        row += `
        <tr>
            <td>${pastStatsData.highestAttendance.name + ' ' + (pastStatsData.highestAttendance.attendance).toFixed(2) + ' %'}</td>
            <td>${pastStatsData.lowestAttendance.name + ' ' + (pastStatsData.lowestAttendance.attendance).toFixed(2) + ' %'}</td>
            <td>${pastStatsData.largerCapacity.name + ' ' + pastStatsData.largerCapacity.capacity}</td>
        </tr>     
        `
    pastEventsStatsElement.innerHTML = row;  
}



function fillTable(){
    printEventsStats();
    printEventsStatsByCategory('#past-event-stats', getEventStats(pastEvents))
    console.log(getEventStats(upcomingEvents));

    printEventsStatsByCategory('#upcoming-event-stats', getEventStats(upcomingEvents))
    
}

getData()