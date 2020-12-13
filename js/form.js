let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            setTextValue(".text-error", "");
            return;
        }
        try {
            checkName(name.value);
            setTextValue(".text-error", "");
        } catch (e) {
            setTextValue(".text-error", "");
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    });

    const startDate = document.querySelector('#date');
    startDate.addEventListener("input", function() {
        const day = document.getElementById("day").value;
        console.log("day",day);
        const month = document.getElementById("month").value;
        const year = document.getElementById("year").value;
        const dateError = document.querySelector(".date-error");
        try {
            checkStartDate(new Date(Date.parse(year.value, month.value - 1, day.value)));
            setTextValue(".date-error", "");
        } catch (e) {
            setTextValue(".date-error", "");
        }
    });
    document.querySelector("#cancelButton").href = siteProperties.homePage;
    checkForUpdate();
    
});

// const save = () => {
//     try {
//         let employeePayrollData = createEmployeePayroll();
//         createAndUpdateStorage(employeePayrollData);
//     } catch (e) {
//         alert("error");
//     }
// }
const saveForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(siteProperties.homePage);
    } catch (e) {
        alert("error");
    }
}
// function createAndUpdateStorage(employeePayrollData) {
//     let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
//     if (employeePayrollList != undefined) {
//         employeePayrollList.push(employeePayrollData);
//     } else {
//         employeePayrollList = [employeePayrollData];
//     }
//     alert(employeePayrollList.toString());
//     localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
// }
function createAndUpdateStorage() {
    let employeeList = JSON.parse(localStorage.getItem("EmployeeList"));
    if (employeeList) {
        let employee = employeeList.find(emp => emp.id == employeePayrollObj.id);
        if (!employee) employeeList.push(saveData());
        else {
            const index = employeeList.map(emp => emp.id).indexOf(employee.id);
            employeeList.splice(index, 1, employeePayrollObj);
        }
    } else {
        employeeList = [saveData()];;
    }

    localStorage.setItem("EmployeeList", JSON.stringify(employeeList));
}
const setEmployeePayrollObject = () => {
    if (!isUpdate && siteProperties.use_local_storage.match("true")) {
        employeePayrollObj.id = createNewId();
    }
    employeePayrollObj._name = document.getElementById("name").value;
    employeePayrollObj._profilePic = document.querySelector('input[name = profile]:checked').value;
    employeePayrollObj._gender = document.querySelector('input[name = gender]:checked').value;
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = document.getElementById("salary").value;
    var day = document.getElementById("day").value;
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;
    employeePayrollObj._note = document.getElementById("notes").value;
    employeePayrollObj._startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

function saveData() {
    //  let employee = new EmployeePayroll();
    if (!isUpdate && siteProperties.use_local_storage.match("true")) {
        employeePayrollObj.id = createNewId();
    }
    employeePayrollObj._name = document.getElementById("name").value;
    employeePayrollObj._profilePic = document.querySelector('input[name = profile]:checked').value;
    employeePayrollObj._gender = document.querySelector('input[name = gender]:checked').value;
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = document.getElementById("salary").value;
    var day = document.getElementById("day").value;
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;
    employeePayrollObj._note = document.getElementById("notes").value;
    employeePayrollObj._startDate = new Date(getInputValueById('#day')+"-"+getInputValueById('#month')+"-"+getInputValueById('#year'));;
    return employeePayrollObj;
}


// const createEmployeePayroll = () => {
//     let employeePayrollData = new EmployeePayRollData();
//     try {
//         employeePayrollData.name = getInputValueById('#name');
//     } catch (e) {
//         setTextValue('.text-error', e);
//         throw e;
//     }
//     employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
//     employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
//     employeePayrollData.department = getSelectedValues('[name=department]');
//     employeePayrollData.salary = getInputValueById('#salary');
//     employeePayrollData.note = getInputValueById('#notes');
//     employeePayrollData.startDate = new Date(getInputValueById('#day')+"-"+getInputValueById('#month')+"-"+getInputValueById('#year'));
//  //   console.log("date:",employeePayrollData.startDate);
//     alert(employeePayrollData.toString());
//     return employeePayrollData;
// }

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._notes);
    let date = (employeePayrollObj._startDate).split(/[ ,]/);
 //   let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    let month = new Date(date).getMonth() + 1;
    setValue("#day", date[2]);
    setValue("#month", month);
    setValue("#year", date[3]);
};
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value))
                item.checked = true;
        } else if (item.value == value) item.checked = true;
    });
};

// const checkForUpdate = () => {
//     const employeePayrollJson = localStorage.getItem("editEmp");
//     console.log("MSg", employeePayrollJson);
//     isUpdate = employeePayrollJson ? true : false;
//     employeePayrollObj = JSON.parse(employeePayrollJson);
//     console.log(employeePayrollObj._name);
//     console.log(employeePayrollObj._startDate);
//     if (isUpdate) {
//         document.querySelector('input[name="name"]').value = employeePayrollObj._name;
//         setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
//         setSelectedValues('[name=gender]', employeePayrollObj._gender);
//         setSelectedValues('[name=department]', employeePayrollObj._department);
//         document.querySelector('input[name="salary"]').value = employeePayrollObj._salary;
//         setTextValue('.salary-output', employeePayrollObj._salary);
//         document.querySelector('textarea[name="notes"]').value = employeePayrollObj._notes;
//         let date = (employeePayrollObj._startDate).split(/[ ,]/);
//         console.log(date)
//         document.getElementById("day").value = date[2];
//         document.getElementById("year").value = date[3];
//         let month = new Date(date[1] + '-1-01').getMonth() + 1;
//         var month_name = function(month){
//             mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
//             document.getElementById("month").value = mlist[month - 1];
//             };
//         // document.getElementById("month").value = month_name(month);
//     } else {
//         return;
//     }
// }
const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem("editEmp");
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
};

const createNewId = () => {
    let empId = localStorage.getItem("EmployeeID");
    empId = !empId ? 1 : (parseInt(empId) + 1).toString();
    localStorage.setItem("EmployeeID", empId);
    return empId;
};