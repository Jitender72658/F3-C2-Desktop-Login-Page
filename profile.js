window.addEventListener('load',displayProfilePage);
const logOutBtn = document.getElementById('logOutBtn');
logOutBtn.addEventListener('click', logOutAndRemoveData);
function displayProfilePage(){  
    const profileBodyTag = document.getElementById("profileBodyTag");
    profileBodyTag.style.backgroundImage = "url(./Images/Rectangle1.svg)";
    const nameData = document.getElementById("nameData");
    const emailData = document.getElementById("emailData")
    const tokenData = document.getElementById("tokenData")
    const passwordData = document.getElementById("passwordData");
    let userData = JSON.parse(sessionStorage.getItem("userdata"));
    nameData.innerText = `Full Name: ${userData.name}`;
    emailData.innerText = `Email: ${userData.email}`;
    tokenData.innerText =  `Token: ${userData.token}`;
    passwordData.innerText = `Password: ${userData.password}`;
}

function logOutAndRemoveData(){
    window.location.href="./index.html";
    localStorage.clear();
}