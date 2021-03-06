window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0){
            textError.textContent = "";
            return;
        }
        // if(name.value.length < 3){
        //     textError.textContent = "Inavlid name";
        // }else{
        //     textError.textContent = "";
        // }
       
        try{
            (new EmployeePayRollData()).name = name.value;
            textError.textContent="";
        }catch(e){
            textError.textContent = e ;
        }
          
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener( 'input' ,function () {
        output.textContent = salary.value;
    });
});

const save = () => {
    try {
        let employeePayroll = createEmployeePayroll(); 
        createAndUpdateStorage(employeePayroll);
    } catch (e) {
        return
    }
}

const createEmployeePayroll = () => {
    
    let employeePayroll = new EmployeePayRollData();
    try {
        employeePayroll.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayroll.picture = getSelectedValues('[name=profile]').pop();
    employeePayroll.gender = getSelectedValues('[name=gender]').pop();
    employeePayroll.department = getSelectedValues('[name=department]');
    employeePayroll.salary = getInputValueById('#salary');
    employeePayroll.notes = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayroll.date = Date.parse(date);
    console.log(employeePayroll.toString());
    alert(employeePayroll.toString());
    return employeePayroll;
}
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if (item.checked) setItems.push(item.value);
    });
    return setItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}
function createAndUpdateStorage(employeePayroll) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayroll);
    } else {
        employeePayrollList = [employeePayroll];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}
function resetForm() {
    document.getElementById("formId").reset();
}
