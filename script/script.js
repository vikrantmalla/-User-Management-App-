//User class : Represents a user
class User {
    constructor(name, email, salary, city) {
        this.name = name;
        this.email = email;
        this.salary = salary;
        this.city = city;
    }

}
// UI class : Handle UI task
class UI {
    // Display user data
    static displayData() {
        const users = Store.getUsers();
        users.forEach((user, index) => UI.addUserToList(user, index));
    }


    // Add user to list
    static addUserToList(user, index) {
        const list = document.querySelector(".list");
        // Create row in table with template data
        const row = document.createElement('tr');
        row.setAttribute('id', `${index}`);
        row.innerHTML = `
                <td class="text-center">${user.name}</td>
                <td class="text-center">${user.email}</td>
                <td class="text-center">${user.salary}</td>
                <td class="text-center">${user.city}</td>
                <td class="action d-flex flex-row justify-content-center align-items-center gap-3">
                    <button class="btn btn-info edit" data-bs-toggle="modal" data-bs-target="#form">Edit</button>
                    <button class="btn btn-danger delete">Delete</button>
                </td>
        `
        list.appendChild(row); // Append or add user in table

        document.getElementById("add").addEventListener('click', () => {
            UI.alertToast("Add new user", "bg-success"); // alert message for adding new user
        });

        // it will reset form if clicked any of the button.
        document.getElementById("closeBtn").addEventListener('click', (e) => {
            UI.resetForm();
            UI.alertToast("Pls fill the form Again", "bg-info"); // alert message for fill form again
        });
        document.getElementById("closeIcon").addEventListener('click', (e) => {
            UI.resetForm();
            UI.alertToast("Pls fill the form Again", "bg-info"); // alert message for fill form again
        });

        // changing UI onClick Add User button
        UI.modalUI("show btn btn-secondary", "Add new user", "space-between", "flex-end", "initial");
    }

    // Edit user 
    static editUser(el) {
        console.log(el);
        // Target element className edit
        if (el.classList.contains('edit')) {
            // Insert data in form for editing purpose
            const selectedTask = el.parentElement.parentElement;
            document.getElementById("fullName").value = selectedTask.children[0].innerHTML;
            document.getElementById("email").value = selectedTask.children[1].innerHTML;
            document.getElementById("salary").value = selectedTask.children[2].innerHTML;
            document.getElementById("city").value = selectedTask.children[3].innerHTML;
            // after editing it will removed selected task onclick add btn
            document.getElementById("add").addEventListener('click', (el) => {
                selectedTask.remove();
                UI.alertToast("Edit User", "bg-primary"); // alert message for edit
            });
            // changing UI onClick edit button
            UI.modalUI("hide", "Edit User", "center", "center", "30%");
        }

    }

    // Delete user
    static deleteUser(el) {
        // Target element className delete
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
            UI.alertToast("Remove User", "bg-danger"); // alert message for delete
        }
    }

    // Alert toast
    static alertToast(message, className) {
        const myAlert = document.getElementById("toast-container");
        let alertMessage = document.querySelector(".toast-body")
        let bsAlert = new bootstrap.Toast(myAlert); //inizialize it
        bsAlert.show(); //show it
        // Add classname and message according to click of Events
        myAlert.classList.add(`${className}`)
        alertMessage.innerHTML = `
            <h6>${message}</h6>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        `;
    }

    // Modal UI
    static modalUI(className, heading, headerJustify, footerJustify, width) {
        document.getElementById("closeBtn").setAttribute('class', `${className}`);
        document.getElementById("closeIcon").setAttribute('class', `${className} btn-close`);
        document.querySelector(".modal-title").innerHTML = `${heading}`;
        document.querySelector(".modal-header").style = `justify-content:${headerJustify}`;
        document.querySelector(".modal-footer").style = `justify-content:${footerJustify}`;
        document.getElementById("add").style = `width:${width}`;
    }

    // Reset or clear form input fields
    static resetForm() {
        // Clear form input fields
        document.getElementById("fullName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("salary").value = "";
        document.getElementById("city").value = "";
        // Remove Error message 
        const errorMessage = document.getElementsByClassName("msg");
        errorMessage[0].innerHTML = "";
        errorMessage[1].innerHTML = "";
        errorMessage[2].innerHTML = "";
        errorMessage[3].innerHTML = "";
    }
};
// Store Class: Handles Storage
class Store {
    static getUsers() {
        let users;
        if (localStorage.getItem('users') === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem('users'));
        }

        return users;
    }

    static addUser(user) {
        const users = Store.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    static removeUser(user, el) {
        const users = Store.getUsers();
        // console.log(user.id)
        users.splice(user.id, 1)
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Event: Display Users
document.addEventListener('DOMContentLoaded', UI.displayData);

// Event: Add Users
let myform = document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    // Get input value
    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const salary = document.getElementById("salary").value;
    const city = document.getElementById("city").value;
    const errorMessage = document.getElementsByClassName("msg");

    // Validate Form
    // Regex
    let nameExp = /^[a-zA-Z\s]+$/;
    let emailExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    let addExp = /^[a-zA-Z0-9\s,.'-]{3,}$/;

    // Validate name input field
    if (name === "") {
        errorMessage[0].innerHTML = "Pls Enter Name";
        return false;
    } else if (!name.match(nameExp)) {
        errorMessage[0].innerHTML = "Pls Enter Valid Name";
        return false;
    } else {
        errorMessage[0].innerHTML = "";
    };
    // Validate email input field
    if (email === "") {
        errorMessage[1].innerHTML = "Pls Enter Email";
        return false;
    } else if (!email.match(emailExp)) {
        errorMessage[1].innerHTML = "Pls Enter Valid Email";
        return false;
    } else {
        errorMessage[1].innerHTML = "";
    };
    // Validate salary input field
    if (salary === "") {
        errorMessage[2].innerHTML = "Pls Enter Salary";
        return false;
    } else {
        errorMessage[2].innerHTML = "";
    };
    // Validate city input field
    if (city === "") {
        errorMessage[3].innerHTML = "Pls Enter City";
        return false;
    } else if (!city.match(addExp)) {
        errorMessage[3].innerHTML = "Pls Enter Valid City";
        return false;
    } else {
        errorMessage[3].innerHTML = "";
    };

    // targting add button and setAttribute to closed model after filling form.
    document.getElementById("add").setAttribute("data-bs-dismiss", "modal");
    add.click();

    // Instance user
    const user = new User(name, email, salary, city);
    // console.log(user)

    // Add User to UI
    UI.addUserToList(user);

    // Add User to store
    Store.addUser(user);

    // Reset the form
    UI.resetForm();
});

// Event: Edit User
document.querySelector(".list").addEventListener('click', (e) => {
    UI.editUser(e.target);
});

// Event: Remove User
document.querySelector(".list").addEventListener('click', (e) => {
    UI.deleteUser(e.target);
    Store.removeUser(e.target.parentElement.parentElement);
});