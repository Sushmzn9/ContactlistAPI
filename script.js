// work flow/
//1. fetch user from API
//2. store those user in globla array
//3. display user in the UI



let userList=[];

const apiEp= "https://randomuser.me/api?";
const displayElm=document.getElementById("list");
const countElem=document.getElementById("count")
const fetchUsers = async (path= "results=20") => {
//promise
// fetch(apiEp).then((response)=>{
// console.log(response);
// return response.json();

// });

// .then((data)=>{
//     userList=data.results;
//     console.log(data);
// })
// .catch((error)=>{
//     console.log(error)
// });
// };
// fetchUsers();


try{
    const response= await fetch(apiEp + path);
    const data = await response.json();
    userList=data.results;
    displayUser(userList);
    console.log(data.results)
   
}
catch{
    console.log(data.results);
}


}
fetchUsers();



const displayUser =(displayArg)=>{
    let str="";
    displayArg.forEach((usr)=>{
str +=`
<div class="card" style="width: 18rem;">
  <img src="${usr?.picture?.large}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${usr?.name?.title} ${usr?.name?.first} ${usr?.name?.last}</h5> 

    <div class="card-text"> 
    <i class="fa-solid fa-envelope"></i> ${usr?.email}
    </div>
    
    <div>
    <i class="fa-solid fa-address-book"></i>  ${usr?.location?.street?.number} ${usr?.location?.city} ${usr?.location?.state} ${usr?.location?.country}
    </div>
    <br/>
    <div>
    <a href="tel:${usr?.phone}" class="btn btn-primary"><i class="fa-solid fa-phone"></i> ${usr?.phone}</a>
    </div>
  </div>
</div>`
    })
    displayElm.innerHTML=str;
    countElem.innerText=displayArg.length;
}



document.getElementById("select").addEventListener("change", (e)  =>{
    const {value}= e.target;
const path = `results=20&gender=` + value;
fetchUsers(path);
});

document.getElementById("search-input").addEventListener ("keyup", (e)=>{
    const {value}=e.target
    //run filter
    const filterUser= userList.filter((item)=>{
console.log(item);
const fullName= (item.name.first + " " + item.name.last).toLowerCase();
return fullName.includes((value).toLowerCase());
    })
    //display function
    console.log(e.target.value);
displayUser(filterUser)
})

