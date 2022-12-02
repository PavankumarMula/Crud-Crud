//bringing form in the js;
document.getElementById("form").addEventListener('submit',adduser);
function adduser(event){
    event.preventDefault();
    const obj={
        Name:document.getElementById("name").value,
        Email:document.getElementById("email").value,
        Phone:document.getElementById("phone").value
    }
    axios.post("https://crudcrud.com/api/0826156a402f4e9190dfbc15d4f3fe88/TestData",obj)
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
    axios.get('https://crudcrud.com/api/0826156a402f4e9190dfbc15d4f3fe88/TestData')
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
                     <td><button onclick="edit('${obj.Email}')">Edit</button></td>
                     <td><button onclick="remove('${obj._id}')">Delete</button></td>`;
                     tbody.appendChild(row);
}
function edit(key){
    
}


//delete functionality
function remove(key){
    axios.delete(`https://crudcrud.com/api/0826156a402f4e9190dfbc15d4f3fe88/TestData/${key}`)
        const parent=document.getElementById("userDetails");
        const child=document.getElementById(key);
        parent.removeChild(child);
}