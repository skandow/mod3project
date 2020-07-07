let displayForm = false;

document.addEventListener("DOMContentLoaded", renderForm)

function renderForm() {
    toggleForm();
    const form = document.getElementById("daily-log-form")
    console.log(form)
    form.addEventListener("submit", submitEvent)
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
    .then(data => renderEvent(data))
}

function renderEvent(data) {
    const eventList = document.getElementById("today-events")
    eventList.innerHTML += `<li>Event: ${data.data.attributes.content}<br>
    Emotion: ${data.data.attributes.emotion}</li>`
}

