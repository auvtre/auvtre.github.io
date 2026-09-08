import { retrieveBySkinId } from "./retrieveSignups.js";

document.querySelectorAll("form[data-accent]").forEach((form) => {
    form.addEventListener("submit", addUser);
});

function addUser(e) {
    e.preventDefault();
    clearErrors();
    const accent = e.currentTarget.dataset.accent;
    let inputUsername = e.currentTarget.querySelector(".signup-username").value;
    inputUsername = inputUsername.replace(/\s/g, "");

    // this should never happen unless i messed up
    if (!accent) {
        return;
    }

    if (!validateUser(inputUsername)) {
        displayError(accent, `Provided username '${inputUsername}' is not valid`);
        return;
    }

    const request = new Request("https://signup-worker.auvtrefraccents.workers.dev/", {
        method: "POST",
        body: `{
            "user": "${inputUsername}",
            "skin": ${accent}
        }`,
    });

    fetch(request).then((response) => {
        response.json().then((json) => {
            if (json.success) {
                clearTable(accent);
                retrieveBySkinId(accent);
            } else {
                displayError(accent, json.message);
            }
        });
    });
}

function validateUser(username) {
    if (!username) return false;

    // between 3 and 16 characters
    if (username.length > 16 || username.length < 3) return false;

    const hasInvalidChars = /[^a-zA-Z0-9]/.test(username);

    if (hasInvalidChars) return false;

    return true;
}

function clearTable(skinId) {
    const table = document.querySelector(`table[data-accent='${skinId}']`);
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.replaceChildren(thead, tbody);
}

function clearErrors() {
    const errorDivs = document.querySelectorAll(`div.active-error`);
    errorDivs.forEach((div) => {
        div.innerHTML = "";
        div.setAttribute("class", "inactive-error");
    });
}

function displayError(skinId, message) {
    const errorDiv = document.querySelector(`div[data-error-accent='${skinId}']`);
    errorDiv.setAttribute("class", "active-error");
    const h4 = document.createElement("h4");
    h4.innerText = "Sorry, your signup couldn't be completed";
    const errorText = document.createElement("p");
    errorText.innerText = message;
    errorDiv.append(h4, errorText);
}
