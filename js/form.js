window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayRollData()).name = name.value;;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
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
            (new EmployeePayRollData()).startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            dateError.textContent = "";
        } catch (e) {
            dateError.textContent = e;
        }
    });
    checkForUpdate();
});

const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    } catch (e) {
        alert("error");
    }
}

function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayRollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    employeePayrollData.startDate = new Date(getInputValueById('#day')+"-"+getInputValueById('#month')+"-"+getInputValueById('#year'));
 //   console.log("date:",employeePayrollData.startDate);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

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

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem("editEmp");
    console.log("MSg", employeePayrollJson);
    isUpdate = employeePayrollJson ? true : false;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    console.log(employeePayrollObj._name);
    console.log(employeePayrollObj._startDate);
    if (isUpdate) {
        document.querySelector('input[name="name"]').value = employeePayrollObj._name;
        setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
        setSelectedValues('[name=gender]', employeePayrollObj._gender);
        setSelectedValues('[name=department]', employeePayrollObj._department);
        document.querySelector('input[name="salary"]').value = employeePayrollObj._salary;
        setTextValue('.salary-output', employeePayrollObj._salary);
        document.querySelector('textarea[name="notes"]').value = employeePayrollObj._notes;
        let date = (employeePayrollObj._startDate).split(/[ ,]/);
        console.log(date)
        document.getElementById("day").value = date[2];
        document.getElementById("year").value = date[3];
        let month = new Date(date[1] + '-1-01').getMonth() + 1;
        var month_name = function(month){
            mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            document.getElementById("month").value = mlist[month - 1];
            };
        // document.getElementById("month").value = month_name(month);
    } else {
        return;
    }
}