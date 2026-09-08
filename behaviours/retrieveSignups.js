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
    const table = document.querySelector(`table[data-accent='${id}']`);
    const runIds = [...new Set(signups.map((obj) => obj.RunId))];
    let tr_signups = [];
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");
    const thead_tr = document.createElement("tr");
    const local_signupIds = JSON.parse(localStorage.getItem(`${id}_SIGNUPS`) || "[]");
    const local_deletionKeys = JSON.parse(localStorage.getItem(`${id}_LDK`) || "[]");
    thead.appendChild(thead_tr);

    runIds.forEach((run, runIndex) => {
        // create a header for the run
        const th = document.createElement("th");
        th.appendChild(document.createTextNode(`Run: ${runIndex + 1}`));
        thead_tr.appendChild(th);

        // get signups for the run
        const runSignups = [...signups.filter((obj) => obj.RunId === run)];

        runSignups.forEach((signup, index) => {
            let tr;
            if (runIndex === 0) {
                tr = document.createElement("tr");
                tbody.appendChild(tr);
                tr_signups[index] = tr;
            } else {
                tr = tr_signups[index];
            }

            let td = document.createElement("td");
            let content;
            if (signup.IsPaid == 1) {
                content = document.createTextNode(`${index + 1}. ${signup.Username} (PAID)`);
            } else {
                content = document.createTextNode(`${index + 1}. ${signup.Username}`);
            }

            td.appendChild(content);

            if (local_signupIds !== null && local_signupIds.includes(signup.Id)) {
                const index = local_signupIds.indexOf(signup.Id);
                const btn = document.createElement("button");
                btn.innerText = "cancel order";

                // add a button with the deleteUser event Listener
                // pass id and local deletion key to  the deleteUser event
                btn.addEventListener("click", () => deleteUser(id, local_signupIds[index], local_deletionKeys[index]));

                td.appendChild(btn);
            }

            tr.appendChild(td);
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
