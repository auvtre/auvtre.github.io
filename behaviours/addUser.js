function addUser(e) {
    e.preventDefault();
    const inputUsername = document.querySelector("#signup-username").value;

    if (!validateUser(inputUsername)) {
        console.log("googoo gaga");
        return;
    }

    const request = new Request("https://signup-worker.auvtrefraccents.workers.dev/", {
        method: "POST",
        body: `{
            "user": "${inputUsername}",
            "skin": 1
        }`,
    });

    fetch(request).then((response) => {
        response.json().then((json) => {
            console.log(json);
        });
    });
}

function validateUser(username) {
    // contains spaces
    // empty
    // contains special characters
    return true;
}
