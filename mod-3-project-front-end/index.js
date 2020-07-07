let displayForm = false;

document.addEventListener("DOMContentLoaded", renderPage)

function renderPage() {
    fetchEvents();
    toggleForm();
    const form = document.getElementById("daily-log-form")
    form.addEventListener("submit", submitEvent)
}

function fetchEvents() {
    fetch("http://localhost:3000/events")
    .then(resp => resp.json())
    .then(events => renderEvents(events))
}

function renderEvents(events) {
    console.log(events.data)
    events.data.forEach(event => {
        renderEvent(event)
    })
    const deleteButtons = document.getElementsByClassName("delete")
    for (let i=0; i<deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteEvent)
    }
}

function toggleForm() {
    const logButton = document.getElementById("daily-log-generator")
    const newForm = document.getElementById("daily-log-form")
    logButton.addEventListener("click", () => {
        displayForm = !displayForm;
    if (displayForm) {
        newForm.style.display = "block";
    } else {
        newForm.style.display = "none";
    }
})
}

function submitEvent(event) {
    event.preventDefault();
    const content = event.target.event.value 
    const emotion = event.target.emotion.value
    const payload = {
        content: content,
        emotion: emotion
    }
    event.target.reset();
    const reqObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(payload)
    }
    fetch("http://localhost:3000/events", reqObj)
    .then(resp => resp.json())
    .then(data => renderEvent(data.data))
}

function renderEvent(data) {
    const eventList = document.getElementById("today-events")
    eventList.innerHTML += `<li id=${data.id}><hr style="width:25%;margin-left:0">Event: ${data.attributes.content}<br>
    Emotion: ${data.attributes.emotion}<br>
    <button class="edit">Edit</button>
    <button class="delete">Delete</li><br<br><br>`
}

function deleteEvent(event) {
    const id = event.target.parentNode.id 
    const url = "http://localhost:3000/events" + "/" + id 
    fetch(url, {method: "DELETE"})
    .then(resp => resp.json())
    .then(json => event.target.parentNode.remove())
}

