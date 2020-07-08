let displayForm = false;
const makeButtonsWork = [workDeleteButtons, workEditButtons, workEditForms]

document.addEventListener("DOMContentLoaded", renderPage)

function renderPage() {
    createDailyLog();
    fetchEvents();
    // toggleForm();
    const form = document.getElementById("daily-log-form")
    form.addEventListener("submit", submitEvent)
}

function fetchEvents() {
    fetch("http://localhost:3000/events")
    .then(resp => resp.json())
    .then(events => renderEvents(events))
}

function renderEvents(events) {
    events.data.forEach(event => {
        renderEvent(event)
    })
    renderButtons();
}

function workDeleteButtons() {
    const deleteButtons = document.getElementsByClassName("delete")
    for (let i=0; i<deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteEvent)
    }
}

function workEditButtons() {
    const editButtons = document.getElementsByClassName("edit")
    for (let i=0; i<editButtons.length; i++) {
        editButtons[i].addEventListener("click", toggleEditForm)
    }
}

function workEditForms() {
    const editForms = document.getElementsByClassName("edit-event-form")
    for (let i=0; i<editForms.length; i++) {
        editForms[i].addEventListener("submit", submitEditedEvent)
    }
}

function renderButtons() {
    makeButtonsWork.forEach(index => {
        index();
    })
}

function createDailyLog() {
  const logButton = document.getElementById("create-daily-log")
  logButton.addEventListener("click", postDailyLog)
}

function postDailyLog() {
  const reqObj = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      }
      // body: JSON.stringify(payload)
  }
  fetch("http://localhost:3000/daily_logs", reqObj)
  .then(resp => resp.json())
  .then(data => renderDailyLog(data.data))
}

function renderDailyLog(data) {
  const logDate = document.getElementById("daily-log-title")
  const logButton = document.getElementById("create-daily-log")
  const generatorButton = document.getElementById("daily-log-generator")
  const logTodayShow = document.getElementById("log-today")
  logDate.innerHTML = data.attributes.title
  logDate.style.display = "block";
  logButton.style.display = "none";
  generatorButton.style.display = "block";
  logTodayShow.style.display = "block";
  toggleForm()
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

function toggleEditForm(event) {
    const id = event.target.parentNode.id
    const editForm = document.getElementById(`edit-${id}`)
    if (editForm.style.display === "none") {
        editForm.style.display = "block"
    } else {
        editForm.style.display = "none"
    }
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

function submitEditedEvent(event) {
    event.preventDefault();
    const content = event.target.event.value
    const emotion = event.target.emotion.value
    const payload = {
        content: content,
        emotion: emotion
    }
    event.target.reset();
    const reqObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(payload)
    }
    fetch(`http://localhost:3000/events/${event.target.dataset.eventId}`, reqObj)
    .then(resp => resp.json())
    .then(data => renderEditedEventData(data.data, event.target))
}

function renderEvent(data) {
    const eventList = document.getElementById("today-events")
    eventList.innerHTML += `<li id=${data.id}><hr style="width:25%;margin-left:0">Event: ${data.attributes.content}<br>
    Emotion: ${data.attributes.emotion}<br>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
    <form style="display:none" data-event-id="${data.id}" id="edit-${data.id}" class="edit-event-form">
    <label for="event">What Happened?</label><br>
    <textarea name="event" rows="20" cols="60">${data.attributes.content}</textarea><br>
    <label for="emotion">What emotion did you experience?</label>
    <select name="emotion" id="emotion">
        <option value="joy">Joy!</option>
        <option value="sadness">Sadness...</option>
        <option value="anger">Anger!</option>
        <option value="disgust">Disgust</option>
        <option value="fear">Fear...</option>
        <option value="surprise">Surprise!</option>
    </select><br>
    <input type="submit">
    </form><br><br></li>`;
    renderButtons();
}

function renderEditedEventData(data, eventTarget) {
    eventTarget.parentNode.innerHTML = `<hr style="width:25%;margin-left:0">Event: ${data.attributes.content}<br>
    Emotion: ${data.attributes.emotion}<br>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
    <form style="display:none" data-event-id="${data.id}" id="edit-${data.id}" class="edit-event-form">
    <label for="event">What Happened?</label><br>
    <textarea name="event" rows="20" cols="60">${data.attributes.content}</textarea><br>
    <label for="emotion">What emotion did you experience?</label>
    <select name="emotion" id="emotion">
        <option value="joy">Joy!</option>
        <option value="sadness">Sadness...</option>
        <option value="anger">Anger!</option>
        <option value="disgust">Disgust</option>
        <option value="fear">Fear...</option>
        <option value="surprise">Surprise!</option>
    </select><br>
    <input type="submit" class="btn btn-primary"></input>
    </form><br><br>`
    renderButtons();
}

function deleteEvent(event) {
    const id = event.target.parentNode.id
    const url = "http://localhost:3000/events" + "/" + id
    fetch(url, {method: "DELETE"})
    .then(resp => resp.json())
    .then(json => event.target.parentNode.remove())
}
