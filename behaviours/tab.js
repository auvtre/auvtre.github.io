const preorders = document.querySelector("#preorders");
const reprints = document.querySelector("#reprints");

function tabNew() {
    preorders.setAttribute("class", "active");
    reprints.setAttribute("class", "inactive");
}

function tabShelved() {
    reprints.setAttribute("class", "active");
    preorders.setAttribute("class", "inactive");
}
