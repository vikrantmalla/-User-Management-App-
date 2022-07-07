/*------------------------Form------------------------- */
let myform = document.getElementById("form");
let nameInput = document.getElementById("fullName");
let emailInput = document.getElementById("email");
let salaryInput = document.getElementById("salary");
let cityInput = document.getElementById("city");
let errorMessage = document.getElementsByClassName("msg");
/*------------------------Form------------------------- */
/*------------------------Table------------------------- */
let list = document.querySelector(".list");
let add = document.getElementById("add");
let closeBtn = document.getElementById("closeBtn");
let closeIcon = document.getElementById("closeIcon");
/*------------------------Table------------------------- */
/*------------------------Toast------------------------- */
let myAlert = document.getElementById("toast-container");
let alertMessage = document.querySelector(".toast-body");
let toastBgColor = document.querySelector(".toast");
/*------------------------Toast------------------------- */

myform.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

// VALIDATION form
let formValidation = () => {
    let nameExp = /^[a-zA-Z\s]+$/;
    let emailExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    let addExp = /^[a-zA-Z0-9\s,.'-]{3,}$/;

    if (nameInput.value === "") {
        errorMessage[0].innerHTML = "Pls Enter Name";
        return false;
    } else if (!nameInput.value.match(nameExp)) {
        errorMessage[0].innerHTML = "Pls Enter Valid Name";
        return false;
    } else {
        errorMessage[0].innerHTML = "";
    }

    if (emailInput.value === "") {
        errorMessage[1].innerHTML = "Pls Enter Email";
        return false;
    } else if (!emailInput.value.match(emailExp)) {
        errorMessage[1].innerHTML = "Pls Enter Valid Email";
        return false;
    } else {
        errorMessage[1].innerHTML = "";
    }

    if (salaryInput.value === "") {
        errorMessage[2].innerHTML = "Pls Enter Salary";
        return false;
    } else {
        errorMessage[2].innerHTML = "";
    }

    if (cityInput.value === "") {
        errorMessage[3].innerHTML = "Pls Enter City";
        return false;
    } else if (!cityInput.value.match(addExp)) {
        errorMessage[3].innerHTML = "Pls Enter Valid City";
        return false;
    } else {
        errorMessage[3].innerHTML = "";
    }
    acceptData();
    // targting add button to closed model after filling form.
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    // it will not allow closed model action without filling form.
    (() => {
        add.setAttribute("data-bs-dismiss", "");
    })();
};

// Init Toast bar
let alertToast = () => {
    let bsAlert = new bootstrap.Toast(myAlert); //inizialize it
    bsAlert.show(); //show it
};

// ACCEPT DATA fun enter in form.
let data = {};
// accept that name, email, salary, city Values in array.
let acceptData = () => {

    data["name"] = nameInput.value;
    data["email"] = emailInput.value;
    data["salary"] = salaryInput.value;
    data["city"] = cityInput.value;

    // console.log(data);
    createUser();
    resetForm();
};


// Generation Unique ID
function generator() {
    var i = 4;
    return function() {
        return i++;
    };
}

var generateId = generator();

// CREATE + template
let createUser = () => {
    list.innerHTML += `
            <tr>
                <td class="text-center">${generateId()}</td>
                <td class="text-center">${data.name}</td>
                <td class="text-center">${data.email}</td>
                <td class="text-center">${data.salary}</td>
                <td class="text-center">${data.city}</td>
                <td class="action d-flex flex-row justify-content-center align-items-center gap-3">
                    <button onClick="editUser(this)" data-bs-toggle="modal" data-bs-target="#form" class="btn btn-info">Edit</button>
                    <button onClick="deleteUser(this)" class="btn btn-danger">Delete</button>
                </td>
            </tr>
    `


    // init toast bar
    addUserMessage();
    alertToast();
};



// Adding class bg-success in toast with template text
let addUserMessage = () => {
    toastBgColor.classList.add("bg-success");
    alertMessage.innerHTML = `
        <h6>Add new user</h6>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    `
};

// EDIT
let editUser = (e) => {
    let selectedTask = e.parentElement.parentElement;
    nameInput.value = selectedTask.children[1].innerHTML;
    emailInput.value = selectedTask.children[2].innerHTML;
    salaryInput.value = selectedTask.children[3].innerHTML;
    cityInput.value = selectedTask.children[4].innerHTML;
    // console.log(selectedTask)
    // after editing it will removed selected task onclick add btn
    add.addEventListener("click", (e) => {
        selectedTask.remove();
        // init toast bar
        editMessage();
        alertToast();
    });
    // it will reset form for adding new user if its not edit
    closeBtn.addEventListener("click", (e) => {
        resetForm();
    });
    closeIcon.addEventListener("click", (e) => {
        resetForm();
    });

};


// Adding class bg-primary in toast with template text
let editMessage = () => {
    toastBgColor.classList.add("bg-primary");
    alertMessage.innerHTML = `
        <h6>Edit user</h6>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    `
};


// DELETE
let deleteUser = (e) => {
    e.parentElement.parentElement.remove();
    // init toast bar
    deleteMessage();
    alertToast();
}

// Adding class bg-danger in toast with template text
let deleteMessage = () => {
    toastBgColor.classList.add("bg-danger");
    alertMessage.innerHTML = `
        <h6>Delete user</h6>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    `
}

// RESET
let resetForm = () => {
    nameInput.value = "";
    emailInput.value = "";
    salaryInput.value = "";
    cityInput.value = "";
}