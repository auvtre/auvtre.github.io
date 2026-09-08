const preorders = document.querySelector("#preorders");
const reprints = document.querySelector("#reprints");
const tab_preorders = document.querySelector("#preorders-tab");
const tab_reprints = document.querySelector("#reprints-tab");

function tabNew() {
    preorders.setAttribute("class", "active-content");
    tab_preorders.setAttribute("class", "active-tab");
    tab_reprints.setAttribute("class", "inactive-tab");
    reprints.setAttribute("class", "inactive-content");
}

function tabShelved() {
    reprints.setAttribute("class", "active-content");
    tab_reprints.setAttribute("class", "active-tab");
    tab_preorders.setAttribute("class", "inactive-tab");
    preorders.setAttribute("class", "inactive-content");
}
