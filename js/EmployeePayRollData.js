class EmployeePayRollData {

    constructor(...params) {
        this.name = params[0];
        this.picture = params[1];
        this.gender = params[2];
        this.department = params[3];
        this.salary = params[4];
        this.startDate = params[5];
        this.notes = params[6];
    }

    get name() {
        return this.name;
    }

    set name(name) {
        this.name = name;
    }

    get picture() {
        return this.picture;
    }
    set picture(picture) {
        this.picture = picture;
    }

    get gender() {
        return this.gender;
    }

    set gender(gender) {
        this.gender = gender;
    }

    get department() {
        return this.department;
    }

    set department(department) {
        this.department = department;
    }

    get salary() {
        return this.salary;
    }

    set salary(salary) {
        this.salary = salary;
    }

    get startDate() {
        return this.startDate;
    }

    set startDate(startDate) {
        this.startDate = startDate;
    }

    get notes() {
        return this.notes;
    }

    set notes(notes) {
        this.notes = notes;
    }
}
