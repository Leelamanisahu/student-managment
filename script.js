console.log("working")
const sName = document.querySelector("#sName");
const id = document.querySelector("#sId");
const contact = document.querySelector("#contact");
const email = document.querySelector("#email");
const btn = document.querySelector(".submit-btn");
const editBtn = document.querySelector(".edit-btn");
const table = document.querySelector(".table-container");
const students = JSON.parse(window.localStorage.getItem('students'));
const col  = document.querySelector(".col")
const studentData = {};
console.log(students)

// add student data into the object 
function addStudent(key, data) {
    studentData[`${key}`] = data;
}
// upload the JSON data into students or localstorage 
const studentsArr = [];
function uploadValue(data) {
    console.log(studentsArr)
    const existingData = JSON.parse(window.localStorage.getItem("students"));
    if (existingData) {
        // If data already exists, push new data into it
        existingData.push(data);
        // Update local storage with the updated data
        window.localStorage.setItem("students", JSON.stringify(existingData));
    } else {
        // If no data exists, create a new array with the new data
        const newData = [data];
        // Update local storage with the new data
        window.localStorage.setItem("students", JSON.stringify(newData));
    }
}

// Regular expressions for validation
const phoneRegex = /^\d{10}$/; // Validates a 10-digit phone number
const nameRegex = /^[a-zA-Z\s]+$/; // Validates alphabets and spaces only
const idRegex = /^\d+$/; // Validates numeric value only
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validates email format

btn.addEventListener('click', (e) => {

    e.preventDefault();

    // clear the error message
    document.querySelector(".Name").textContent = "";
    document.querySelector(".id").textContent = "";
    document.querySelector(".contact").textContent = "";
    document.querySelector(".email").textContent = "";
    
    // Validation for name
    if (!nameRegex.test(sName.value)) {
        document.querySelector(".Name").insertAdjacentText("beforeend", "Invalid name");
    }
    // Validation for ID
    else if (!idRegex.test(id.value)) {
        document.querySelector(".id").insertAdjacentText("beforeend", "Invalid ID");
    }
    // Validation for contact
    else if (!phoneRegex.test(contact.value)) {
        document.querySelector(".contact").insertAdjacentText("beforeend", "Invalid contact");
    }
    // Validation for email
    else if (!emailRegex.test(email.value)) {
        document.querySelector(".email").insertAdjacentText("beforeend", "Invalid email");
    }
    else {
        // add all the data into object
        addStudent("Name", sName.value)
        addStudent("Id", id.value)
        addStudent("contact", contact.value)
        addStudent("email", email.value)
        console.log(studentData)
        // upload object data into localstorage
        uploadValue(studentData)
        // empty the input value 
        sName.value = "";
        id.value = "";
        contact.value = "";
        email.value = "";
        // render the new data
        document.location.reload();
    }
});


// function to render the inserted data into table 
function showData(){
    // use foreach loop to go through each object of the data in the array
       const dataRows = document.querySelectorAll('.table-container tr.col:not(:first-child)');
       console.log(dataRows)
    // dataRows.forEach(row => row.remove());
    let Sno = 1;
students.forEach((element,index )=> {
        console.log(element)
    table.insertAdjacentHTML("beforeend",`
    <tr class='col'>
    <td>${Sno++}</td>
    <td>${element.Name}</td>
    <td>${element.Id}</td>
    <td>${element.contact}</td>
    <td>${element.email}</td>
    <td class='ed-btn' ><button class='edit-btn' data-index='${index}'>Edit</button>
    <button class='del-btn' data-index='${index}'>Delete</button>
    </td>
    </tr>
    `)
});
}
showData();
// delete feature on button click
table.addEventListener('click',(e)=>{
    // check for the button that contains del-btn class
    if(e.target.classList.contains('del-btn')){
        e.preventDefault();
        console.log("delete btn")
        // find the closest tr tag
        const row = e.target.closest('tr');
        // now get the value of attribut name data-index to find the index of the element in students
        const rowIndex = e.target.getAttribute('data-index');
        // convert it into int 
        const index = parseInt(rowIndex)
        // remove the one element from that index in the students 
        students.splice(index,1);
        // remove that row from table 
        row.remove();
        // insert new students array in the localstorage
        window.localStorage.setItem('students',JSON.stringify(students));
    }
})

let editIndex;
// edit featue on button click
table.addEventListener('click',(e)=>{
    if(e.target.classList.contains('edit-btn')){
        e.preventDefault();
        console.log('edit btn')
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
        const row = e.target.closest('tr');
        const rowIndex = e.target.getAttribute('data-index');
     editIndex = parseInt(rowIndex)
        console.log("index",editIndex);
        const rowData = students[editIndex];
        console.log(rowData)
        sName.value = rowData.Name;
        id.value = rowData.Id;
        contact.value = rowData.contact;
        email.value = rowData.email;
        btn.classList.add("hide");
        editBtn.classList.remove("hide");
    }
})

editBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log("edit index",editIndex)
    // addStudent("Name", sName.value)
    // addStudent("Id", id.value)
    // addStudent("contact", contact.value)
    // addStudent("email", email.value)
      // clear the error message
      document.querySelector(".Name").textContent = "";
      document.querySelector(".id").textContent = "";
      document.querySelector(".contact").textContent = "";
      document.querySelector(".email").textContent = "";
      
      // Validation for name
      if (!nameRegex.test(sName.value)) {
          document.querySelector(".Name").insertAdjacentText("beforeend", "Invalid name");
      }
      // Validation for ID
      else if (!idRegex.test(id.value)) {
          document.querySelector(".id").insertAdjacentText("beforeend", "Invalid ID");
      }
      // Validation for contact
      else if (!phoneRegex.test(contact.value)) {
          document.querySelector(".contact").insertAdjacentText("beforeend", "Invalid contact");
      }
      // Validation for email
      else if (!emailRegex.test(email.value)) {
          document.querySelector(".email").insertAdjacentText("beforeend", "Invalid email");
      }
      else {
          // add all the data into object
          addStudent("Name", sName.value)
          addStudent("Id", id.value)
          addStudent("contact", contact.value)
          addStudent("email", email.value)
          console.log(studentData)
    console.log(studentData)
    students[editIndex] = studentData;
    window.localStorage.setItem("students", JSON.stringify(students)); 
    editBtn.classList.add("hide");
    btn.classList.remove("hide");
    document.location.reload();
    sName.value = "";
    id.value = "";
    contact.value = "";
    email.value = "";
      }
})
