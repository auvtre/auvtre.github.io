function addUser(e) {
    e.preventDefault();
    const accent = event.currentTarget.dataset.accent;
    const inputUsername = event.currentTarget.querySelector(".signup-username").value;

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
                // call build skin table
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
