let myLeads = [];
const saveLeadBtn = document.getElementById("save-lead-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("leads-container");
const deleteAllBtn = document.getElementById("delete-all-btn");
const saveTabBtn = document.getElementById("save-tab-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

saveTabBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

function render(leads) {
    let listItems = "";

    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a href="${leads[i]}" target="_blank">
                ${leads[i]}
                <img src="assets/explore.svg" alt="explore icon"/>
            </a>
            <button title="double-click to delete">
              <img src="assets/delete.svg" alt="delete icon"/>
            </button>
        </li>
        `;
    }

    ulEl.innerHTML = listItems;
}

deleteAllBtn.addEventListener("dblclick", () => {
    localStorage.removeItem("myLeads");
    myLeads = [];
    render(myLeads);
});

saveLeadBtn.addEventListener("click", () => {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    // console.log(localStorage.getItem("myLeads"));
});