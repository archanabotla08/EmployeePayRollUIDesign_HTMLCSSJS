window.addEventListener("DOMContentLoaded", (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    const innerHtml = `${headerHtml}
    <tr>
    <td>
        <img class="profile" alt="" src="../assets/profileImages/Ellipse -9.png">
    </td>
    <td>Sridhar Botla</td>
    <td>Male</td>
    <td>
        <div class="dept-label">Sales</div>
        <div class="dept-label">Engineering</div>
    </td>
    <td>900000</td>
    <td>03 Feb 2021</td>
    <td>
        <img id="1" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
        <img id="1" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
    </td>
 </tr>
    `;
    document.querySelector("#display").innerHTML = innerHtml;
};