import { deleteUser } from "./deleteUser.js";

getActiveAccents();

function getActiveAccents() {
    const forms = document.querySelectorAll("form[data-accent]");

    forms.forEach((form) => {
        const id = form.getAttribute("data-accent");
        retrieveBySkinId(id);
    });
}

function buildSkinTable(id, signups) {
    const table = document.querySelector(`div[data-accent='${id}']`);
    const runIds = [...new Set(signups.map((obj) => obj.RunId))];
    let tr_signups = [];
    const local_signupIds = JSON.parse(localStorage.getItem(`${id}_SIGNUPS`) || "[]");
    const local_deletionKeys = JSON.parse(localStorage.getItem(`${id}_LDK`) || "[]");

    runIds.forEach((run, runIndex) => {
        // create a header for the run
        const strong = document.createElement("strong");
        strong.appendChild(document.createTextNode(`Run: ${runIndex + 1}`));
        table.appendChild(strong);

        // get signups for the run
        const runSignups = [...signups.filter((obj) => obj.RunId === run)];

        runSignups.forEach((signup, index) => {
            let cell = document.createElement("div");
            cell.className = "cell-content";
            let content = document.createElement("p");
            if (signup.IsPaid == 1) {
                content.textContent = `${index + 1}. ${signup.Username} (PAID)`;
            } else {
                content.textContent = `${index + 1}. ${signup.Username}`;
            }

            cell.appendChild(content);

            if (local_signupIds !== null && local_signupIds.includes(signup.Id)) {
                const index = local_signupIds.indexOf(signup.Id);
                const btn = document.createElement("button");
                btn.innerText = "cancel order";

                // add a button with the deleteUser event Listener
                // pass id and local deletion key to  the deleteUser event
                btn.addEventListener("click", () => deleteUser(id, local_signupIds[index], local_deletionKeys[index]));

                cell.appendChild(btn);
            }

            table.appendChild(cell);
        });
    });
}

export function retrieveBySkinId(id) {
    const request = new Request(`https://signup-retrieval-worker.auvtrefraccents.workers.dev/?accentId=${id}`, {
        method: "GET",
    });

    fetch(request).then((response) => {
        response.json().then((json) => {
            var signups = JSON.parse(json);
            buildSkinTable(id, signups);
        });
    });
}
