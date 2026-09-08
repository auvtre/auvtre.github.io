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
