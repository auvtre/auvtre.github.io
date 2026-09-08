export function clearTable(skinId) {
    const table = document.querySelector(`table[data-accent='${skinId}']`);
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.replaceChildren(thead, tbody);
}

export function clearErrors() {
    const errorDivs = document.querySelectorAll(`div.active-error`);
    errorDivs.forEach((div) => {
        div.innerHTML = "";
        div.setAttribute("class", "inactive-error");
    });
}

export function displayError(skinId, message) {
    const errorDiv = document.querySelector(`div[data-error-accent='${skinId}']`);
    errorDiv.setAttribute("class", "active-error");
    const h4 = document.createElement("h4");
    h4.innerText = "Sorry, your signup couldn't be completed";
    const errorText = document.createElement("p");
    errorText.innerText = message;
    errorDiv.append(h4, errorText);
}
