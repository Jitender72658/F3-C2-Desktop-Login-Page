const submitButton = document.getElementById('submitBtn');
const messageContainer = document.getElementById('messageContainer');
const form = document.getElementById("userDataForm");
const messageContentDiv = document.getElementById("messageContentDiv");
let isPasswordSuccess = false;
console.log(form);
form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        if(validateForm()){
          messageContainer.style.display = 'block';
          console.log(isPasswordSuccess);
          if(!isPasswordSuccess){
           messageContentDiv.innerHTML=`<span class="close-message" id="closeMessage">&times;</span>
           <p id="messageContent">Invalid Password! Try again. <br> Note: Password should be of minimum 8 characters and should match.</p>`;
           const closeMessageButton = document.getElementById('closeMessage');
           closeMessageButton.addEventListener('click', () => {
            console.log("clicked");
            messageContainer.style.display = 'none';
        });
          }
          else{
            messageContentDiv.innerHTML=`<p id="messageContent">Registeration Successful</p>`;
            setTimeout(redirectProfilePage,2000);
           
          }
      }
})
function redirectProfilePage(){
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const  password = document.getElementById("password").value;
    const userData = {
        name: name,
        email: email,
        password: password,
        token: generateRandomToken(16)
      }
    sessionStorage.setItem("userdata",JSON.stringify(userData));
    console.log(userData);
    window.location.href="./profile.html";
}

// validate form method for validating data
function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const  password = document.getElementById("password").value;
    const  confirmPassword = document.getElementById("confirmPass").value;

    if (name === "" || email === "" || password==="" || confirmPassword ==="") {
        return false;
    }
    if(password!==confirmPassword || password.length<8){
        return true;
    }
    isPasswordSuccess = true;
    return true;
}
function generateRandomToken(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      token += charset.charAt(randomIndex);
    }
  
    return token;
  }
  window.addEventListener('load',()=>{
    form.reset();
    localStorage.clear();
});
// Close the popup message when the close button is clicked
