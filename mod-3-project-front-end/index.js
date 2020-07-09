let displayForm = false;
const makeButtonsWork = [workDeleteButtons, workEditButtons, workEditForms]

document.addEventListener("DOMContentLoaded", renderPage)

function renderPage() {
    userLogInEventSetter();
    userLogOutEventSetter()
    createDailyLog();
    // toggleForm();
    const saveButton = document.getElementById("complete-log")
    const form = document.getElementById("daily-log-form")
    form.addEventListener("submit", submitEvent)
    saveButton.addEventListener("click", saveDailyLog)
    searchForLoggedInUser()
}

function userLogOutEventSetter() {
    const logOut = document.getElementById("log-out")
    logOut.addEventListener("click", logOutNow)
}

function logOutNow() {
    const userId = document.getElementById("create-daily-log").dataset.userId
    const payload = {logged_in: false}
    const reqObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    fetch(`http://localhost:3000/users/${userId}`, reqObj)
    .then(resp => resp.json())
    .then(json => location.reload())
}

function searchForLoggedInUser() {
    const payload = {logged_in: true}
    const reqObj = {method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)}
    fetch("http://localhost:3000/users/search", reqObj)
    .then(resp => resp.json())
    .then(data => sortUserData(data))
    .catch(resp => console.log("No users are logged in."))
}

function userLogInEventSetter() {
    const logIn = document.getElementById("log-in")
    logIn.addEventListener("submit", findUser)
}

function findUser(event) {
    event.preventDefault();
    const userName = event.target[0].value
    const payload = {username: userName}
    const reqObj = {method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)}
    fetch("http://localhost:3000/users/search", reqObj)
    .then(resp => resp.json())
    .then(data => sortUserData(data))
}

function sortUserData(data) {
    const name = data.data.attributes.username
    const greeting = document.getElementById("greeting")
    greeting.textContent = `Welcome back, ${name}!`
    const buttonToCreateLog = document.getElementById("create-daily-log")
    buttonToCreateLog.setAttribute("data-user-id", data.data.id)
    document.getElementById("log-out").style.display = "block"
    const logsArray = data.included
    renderDailyLogs(logsArray)
}

function saveDailyLog(event) {
  const logID = event.target.previousElementSibling.previousElementSibling.dataset.logId
  const url = `http://localhost:3000/daily_logs/${logID}`
  const dailyLogBox = document.getElementById("daily-log-box")
  const ulToClear = document.getElementById("today-events")
  const newCreateButton = document.getElementById("create-daily-log")
  const reqObj = {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({status: "complete"})
  }
  dailyLogBox.style.display = "none";
  ulToClear.innerHTML = `Today's Log:<br><br>`
  newCreateButton.style.display = "block";
  fetch(url, reqObj)
  .then(resp => resp.json())
  .then(data => seekUser())
}

function seekUser() {
    const userId = document.getElementById("create-daily-log").dataset.userId
    fetch(`http://localhost:3000/users/${userId}`)
    .then(resp => resp.json())
    .then(data => sortUserData(data))
}

function fetchDailyLogs(dailyLog) {
    fetch(`http://localhost:3000/daily_logs/${dailyLog.id}`)
    .then(resp => resp.json())
    .then(dailylog => console.log(dailylog.data))
}

function renderDailyLogs(dailylogs) {
    const lastDailyLog = dailylogs[dailylogs.length - 1]
    if (lastDailyLog.attributes.status === "current") {
        const logButton = document.getElementById("create-daily-log")
        logButton.style.display = "none"
        logButton.disabled = "true"
        renderDailyLog(lastDailyLog)
        renderEvents(lastDailyLog.attributes.events)
    } else {
      const dailyLogForm = document.getElementById("daily-log-form")
      dailyLogForm.style.display = "none";
    }
    renderOldLogs(dailylogs)
}

function showMenu() {
  document.getElementById("past-logs-list").classList.toggle("show")
  if (event.target.textContent === "Open Previous Daily Log Menu") {
    event.target.textContent = "Close Previous Daily Log Menu"
  } else {
    event.target.textContent = "Open Previous Daily Log Menu"
  }
}

function renderOldLogs(dailylogs) {
    const completeLogs = dailylogs.filter(log => log.attributes.status === "complete")
    const oldLogsSection = document.getElementById("old-logs")
    const dropDown = document.getElementById("past-logs-list")
    oldLogsSection.innerHTML = "";
    completeLogs.forEach(log => {
        const eventsText = renderOldEvents(log.attributes.events)
        oldLogsSection.innerHTML += `<div class="old-log-card" id=card-for-${log.id} style="display:none">
        <h3>Log for ${log.attributes.title}:</h3>
        ${eventsText}
        </div>`
        dropDown.innerHTML += `<p class="drop-down-option" data-log-id="card-for-${log.id}">${log.attributes.title}</p>`
    })
    document.getElementById("main").style.display = "block"
    document.getElementById("footer").style.display = "block"
    document.getElementById("log-in").style.display = "none"
  addDropDownEvent()
}

function addDropDownEvent(){
  const dropDowns = document.getElementsByClassName("drop-down-option")
  for (i=0; i<dropDowns.length; i++) {
    dropDowns[i].addEventListener("click", showLogCard)
  }
}

function showLogCard(event) {
  const cards = document.getElementsByClassName("old-log-card")
  const cardID = event.target.dataset.logId
  const card = document.getElementById(cardID)
  for (i=0; i<cards.length; i++) {
    cards[i].style.display = "none"
  }
  card.style.display = "block"
}

function renderOldEvents(events) {
    let eventString = `<ul style="list-style-type:none">`
    if ( events.length === 0 ) {
      eventString += `<li class="no-emotion">☠️You felt no emotion today.☠️</li>`
    } else {
      events.forEach(event => {
          eventString += renderOldEvent(event)
      })
    }
  eventString += `</ul>`
  return eventString
}

function renderOldEvent(event) {
    return `<li id=${event.id} class="${event.emotion}"  >Event: ${event.content}<br>
    Emotion: ${event.emotion}</li>`
}

function renderEvents(events) {
    events.forEach(event => {
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
  logButton.addEventListener("click", grabDailyLogs)
}

function grabDailyLogs() {
    const userId = (event.target.dataset.userId)
   fetch(`http://localhost:3000/users/${userId}`)
  .then(resp => resp.json())
  .then(data => checkDailyLogs(data.included, data.data.id))
}

function checkDailyLogs(data, id) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    const today = new Date()
    const compareDate = today.toLocaleDateString("en-US", options)
    if (compareDate === data[data.length - 1].attributes.title) {
        const greeting = document.querySelector("header")
        greeting.innerHTML += `<hr><p style="color:red">You have already submitted a log for today.</p>`
    } else {
        postDailyLog(id)
    }
}

function postDailyLog(id) {
  const userId = parseInt(id)
  const reqObj = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
        body: JSON.stringify({user_id: userId})
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
  logDate.innerHTML = `Daily Log for ${data.attributes.title}`
  document.getElementById("daily-log-box").style.display = "block";
  logButton.style.display = "none";
  generatorButton.style.display = "block";
  logTodayShow.style.display = "block";
  const newForm = document.getElementById("daily-log-form")
  newForm.setAttribute("data-log-id", `${data.id}`)
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
    const logId = parseInt(event.target.dataset.logId)
    const payload = {
        content: content,
        emotion: emotion,
        daily_log_id: logId
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
    .then(data => renderNewEvent(data.data))
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
    eventList.innerHTML += `<li class="${data.emotion}" id=${data.id} >Event: ${data.content}<br>
    Emotion: ${data.emotion}<br>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
    <form style="display:none" data-event-id="${data.id}" id="edit-${data.id}" class="edit-event-form">
    <label for="event">What Happened?</label><br>
    <textarea name="event" rows="20" cols="60">${data.content}</textarea><br>
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

function renderNewEvent(data) {
    const eventList = document.getElementById("today-events")
    eventList.innerHTML += `<li id=${data.id} class="${data.attributes.emotion}" style="width:50%";>Event: ${data.attributes.content}<br>
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
    eventTarget.parentNode.className = `${data.attributes.emotion}`
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
