import { retrieveBySkinId } from "./retrieveSignups.js";
import { clearErrors, clearTable, displayError } from "./utils.js";

export function deleteUser(skinId, signupId, localDeletionKey) {
    clearErrors();

    if (!confirm("Are you sure you want to cancel this order?")) {
        return;
    }

    const request = new Request("https://signup-deletion-worker.auvtrefraccents.workers.dev/", {
        method: "POST",
        body: `{
            "id": ${signupId},
            "key": "${localDeletionKey}"
        }`,
    });

    fetch(request).then((response) => {
        response.json().then((json) => {
            if (json.success) {
                updateLocalStorage(skinId, signupId);
                clearTable(skinId);
                retrieveBySkinId(skinId);
            } else {
                displayError(skinId, json.message);
            }
        });
    });
}

function updateLocalStorage(skinId, signupId) {
    let signups = JSON.parse(localStorage.getItem(`${skinId}_SIGNUPS`) || "[]");
    let ldk = JSON.parse(localStorage.getItem(`${skinId}_LDK`) || "[]");

    const index = signups.indexOf(signupId);

    signups.splice(index, 1);
    ldk.splice(index, 1);

    localStorage.setItem(`${skinId}_SIGNUPS`, JSON.stringify(signups));
    localStorage.setItem(`${skinId}_LDK`, JSON.stringify(ldk));
}
