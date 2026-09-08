import { retrieveBySkinId } from "./retrieveSignups.js";

document.querySelectorAll("form[data-accent]").forEach((form) => {
    form.addEventListener("submit", addUser);
});

function addUser(e) {
    e.preventDefault();
    const accent = e.currentTarget.dataset.accent;
    const inputUsername = e.currentTarget.querySelector(".signup-username").value;

    if (!accent) return;

    if (!validateUser(inputUsername)) {
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
            }
        });
    });
}

function validateUser(username) {
    if (!username) return false;

    // between 3 and 16 characters
    if (username.length > 16 || username.length < 3) return false;

    const specialChars = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "-",
        "+",
        "=",
        "{",
        "}",
        "[",
        "]",
        ":",
        ";",
        '"',
        "'",
        "<",
        ">",
        ",",
        ".",
        "?",
        "/",
        "|",
        "\\",
    ];

    if (username.split("").some((c) => specialChars.includes(c))) return false;

    return true;
}

function clearTable(skinId) {
    const table = document.querySelector(`table[data-accent='${skinId}']`);
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.replaceChildren(thead, tbody);
}
