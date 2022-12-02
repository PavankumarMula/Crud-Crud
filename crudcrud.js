//bringing form in the js;
document.getElementById("form").addEventListener('submit',adduser);
function adduser(event){
    event.preventDefault();
    const obj={
        Name:document.getElementById("name").value,
        Email:document.getElementById("email").value,
        Phone:document.getElementById("phone").value
    }
    axios.post("https://crudcrud.com/api/ced1b52b9abe4eb0914e94c135f8b0a4/TestData",obj)
    .then((response) =>{
        addusertoUI(response.data);
        })
    .catch((err) =>{
        document.body.innerHTML="<h4>Something went wrong</h4>"
    })
  //localStorage.setItem(obj.Email,JSON.stringify(obj));
  //addusertoUI(obj);
}
//fetching data from crudcrud on refreshing
window.onload=function load(){
    axios.get('https://crudcrud.com/api/ced1b52b9abe4eb0914e94c135f8b0a4/TestData')
                .then((response) =>{
                    for(let i=0;i<response.data.length;i++){
                        addusertoUI(response.data[i]);
                    }
                })
                .catch((err)=>{
                    document.body.innerHTML="<h4>Something went wrong</h4>";
                })
}
//Adding new Elements in UI
function addusertoUI(obj){
        let email=obj.Email;
       const tbody=document.getElementById("userDetails");
       const row=document.createElement('tr');
       row.id=obj._id;
       row.innerHTML=`<td>${obj.Name}</td>
                     <td>${obj.Email}</td>
                     <td>${obj.Phone}</td>
                     <td><button onclick="edit('${obj._id}','${obj}')">Edit</button></td>
                     <td><button onclick="remove('${obj._id}')">Delete</button></td>`;
                     tbody.appendChild(row);
}

//edit functionality
function edit(key){
    axios.get(`https://crudcrud.com/api/ced1b52b9abe4eb0914e94c135f8b0a4/TestData/${key}`)
    .then((response)=>{
        document.getElementById('name').value=response.data.Name;
        document.getElementById('email').value=response.data.Email;
        document.getElementById('phone').value=response.data.Phone;
    })
    .then(()=>{
        remove(key);
        const parent=document.getElementById("userDetails");
        const child=document.getElementById(key);
        parent.removeChild(child);
    })
    .catch((err)=>console.log(err));
}    

//delete functionality
function remove(key){
    axios.delete(`https://crudcrud.com/api/ced1b52b9abe4eb0914e94c135f8b0a4/TestData/${key}`)
        const parent=document.getElementById("userDetails");
        const child=document.getElementById(key);
        parent.removeChild(child);
}