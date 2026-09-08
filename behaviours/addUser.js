import { retrieveBySkinId } from "./retrieveSignups.js";
import { clearErrors, clearTable, displayError } from "./utils.js";

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
                updateLocalStorage(accent, json.localDeletionData);
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

function updateLocalStorage(skinId, localDeletionData) {
    let signups = JSON.parse(localStorage.getItem(`${skinId}_SIGNUPS`) || "[]");
    let ldk = JSON.parse(localStorage.getItem(`${skinId}_LDK`) || "[]");

    signups.push(localDeletionData.id);
    ldk.push(localDeletionData.localDeletionKey);

    localStorage.setItem(`${skinId}_SIGNUPS`, JSON.stringify(signups));
    localStorage.setItem(`${skinId}_LDK`, JSON.stringify(ldk));
}
