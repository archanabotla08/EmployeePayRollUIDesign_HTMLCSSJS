class EmployeePayRollData {

    //getter and setter method
    get id() { return this._id; }
    set id(id) {
        this._id = id;
    }

    get name() { return this._name; }
    set name(name) {
        let nameRegex=RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if(nameRegex.test(name))
            this._name=name;
        else throw ' Name is Incorrect ';
    }

    get profilePic() { return this._profilePic; }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }

    get gender() { return this._gender; }
    set gender(gender) {
        this._gender = gender;
    }

    get department() { return this._department; }
    set department(department) {
        this._department = department;
    }

    get salary() { return this._salary; }
    set salary(salary) {
        this._salary = salary;
    }

    get note() { return this._note;}
    set note(note) {
        this._note = note;
    }

    get startDate() { return this._startDate; }
    set startDate(startDate) {
            this._startDate = startDate;
    }

    //method
    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocalDateString("en-US", options);
        return "id=" + this.id + ", name=" + this.name + ", gender=" + this.gender +
            ", profilePic=" + this.profilePic + ", department=" + this.department +
            ", salary=" + this.salary + ", startDate=" + empDate + ", note=" + this.note;
    }
}
// class EmployeePayRollData {

//     get id() {
//         return this.id;
//     }
//     set id(id) {
//         this.id = id;
//     }

//     get name() {
//         return this.name;
//     }

//     set name(name) {
//         let nameRegex = /^[A-Z][a-z]{2,}$/;
//         if (nameRegex.test(name))
//             this.name = name;
//         else
//             throw "Invalid name";
//     }

//     get picture() {
//         return this.picture;
//     }
//     set picture(picture) {
//         this.picture = picture;
//     }

//     get gender() {
//         return this.gender;
//     }

//     set gender(gender) {
//         this.gender = gender;
//     }

//     get department() {
//         return this.department;
//     }

//     set department(department) {
//         this.department = department;
//     }

//     get salary() {
//         return this.salary;
//     }

//     set salary(salary) {
//         this.salary = salary;
//     }

//     get startDate() {
//         return this.startDate;
//     }

//     set startDate(startDate) {
//         startDate = startDate.getTime() + (30 * 24 * 60 * 60 * 1000);
//         let today = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
//         if (today >= startDate) {
//             this.startDate = startDate;
//         } else {
//             ("Invalid date");
//         }
//     }

//     get notes() {
//         return this.notes;
//     }

//     set notes(notes) {
//         this.notes = notes;
//     }

//     toString() {
//         const options = { year: 'numeric', month: 'long', day: 'numeric' };
//         const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-US", options);
//         return "id = " + this.id + ", name = " + this.name + ", gender = " + this.gender + ", profile picture = " + this.picture + ", department = " + this.department + ", salary = " + this.salary + ", startDate = " + this.startDate + ", notes = " + this.notes;
//     }
// }