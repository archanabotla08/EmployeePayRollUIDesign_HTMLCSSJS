let employeePayrollList;
// window.addEventListener("DOMContentLoaded", (event) => {
//     employeePayrollList = getEmployeePayrollDataFromStorage();
//     document.querySelector(".emp-count").textContent = employeePayrollList.length;
//     createInnerHtml();
//     localStorage.removeItem("editEmp");
// });
// const getEmployeePayrollDataFromStorage = () => {
//     console.log("values-->",JSON.parse(localStorage.getItem('EmployeeList')));
//     return localStorage.getItem('EmployeeList') ? JSON.parse(localStorage.getItem('EmployeeList')) : [];
// }
window.addEventListener("DOMContentLoaded", (event) => {
    if (siteProperties.use_local_storage.match("true")) {
        getEmployeeFromStorage();
    } else getEmployeePayrollDataFromServer();
});

const getEmployeeFromStorage = () => {
    // document.querySelector(".emp-count").textContent = employeePayrollList.length;
    employeePayrollList = localStorage.getItem("EmployeeList") ? JSON.parse(localStorage.getItem("EmployeeList")) : [];
    processEmployeePayrollDataResponse();
};

const processEmployeePayrollDataResponse = () => {
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

const getEmployeePayrollDataFromServer = () => {
    makePromiseCall("GET", siteProperties.server_url, true)
        .then(responseText => {
            employeePayrollList = JSON.parse(responseText);
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status :" + JSON.stringify(error));
            employeePayrollList = [];
            processEmployeePayrollDataResponse();
        });
}
const createInnerHtml = () => {
    const headerHtml = "<tr><th>Picture</th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    if(employeePayrollList.length == 0) return;  
    let innerHtml = `${headerHtml}`
  //  let employeePayrollList = createEmployeePayrollJSON();
    for (const employee of employeePayrollList) {
        let displayDate = stringifyDate(employee._startDate);
        innerHtml = `${innerHtml}
    <tr>
    <td>
        <img class="profile" alt="" src="${employee._profilePic}">
    </td>
    <td>${employee._name}</td>
    <td>${employee._gender}</td>
    <td>${getDeptHtml(employee._department)}</td>
    <td>${employee._salary}</td>
    <td>${displayDate}</td>
    <td>
        <img id="${employee._name}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
        <img id="${employee._name}" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
    </td>
 </tr>
    `;
    }
    document.querySelector("#display").innerHTML = innerHtml;
};

const remove = (node) => {
    let employeeData = employeePayrollList.find(empData => empData._name == node.id);
    if (!employeeData) return;
    const index = employeePayrollList.map(empData => empData._name).indexOf(employeeData._name);
    employeePayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    createInnerHtml();
}
const getDeptHtml = (deptList) => {
    let deptHtml = "";
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
};
const update = (node) => {
    let employeeData = employeePayrollList.find(empData => empData._name == node.id);
    console.log("data==>",employeeData);
    if (!employeeData) return;
    localStorage.setItem("editEmp", JSON.stringify(employeeData));
    window.location.replace(siteProperties.addEmpPayrollPage);
};
