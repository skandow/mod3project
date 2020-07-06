let displayForm = false;

document.addEventListener("DOMContentLoaded", toggleForm)

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