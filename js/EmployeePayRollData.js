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
    get id() {
        return this.id;
    }
    set id(id) {
        this.id = id;
    }

    get name() {
        return this.name;
    }

    set name(name) {
        let nameRegex = /^[A-Z]{1}[a-z]{2,}$/;
        if (nameRegex.test(name))
            this.name = name;
        else throw "Invalid name";
            
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
        startDate = startDate.getTime() + (30 * 24 * 60 * 60 * 1000);
        let today = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
        if (today >= startDate) {
            this.startDate = startDate;
        } else {
            ("Invalid date");
        }
    }

    get notes() {
        return this.notes;
    }

    set notes(notes) {
        this.notes = notes;
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-US", options);
        return "id = " + this.id + ", name = " + this.name + ", gender = " + this.gender + ", profile picture = " + this.picture + ", department = " + this.department + ", salary = " + this.salary + ", startDate = " + this.startDate + ", notes = " + this.notes;
    }
}