const submitButton = document.getElementById('submitBtn');
const messageContainer = document.getElementById('messageContainer');
const form = document.getElementById("userDataForm");
const messageContentDiv = document.getElementById("messageContentDiv");
const mandatoryNote = document.getElementById("mandatoryNote");
const passwordError = document.getElementById("invalidPasswordError");
let isPasswordSuccess = true;
let isMandatoryFulfilled = true;
let isPasswordMatching = true;
document.addEventListener('DOMContentLoaded', function() {
form.addEventListener('submit', function(event) {
        event.preventDefault();
        mandatoryNote.style.display = "none";
        passwordError.style.display = "none";
        if(!isMandatoryFulfilled){
             mandatoryNote.style.display = "block";
             isMandatoryFulfilled = true;
          } 
          if(!isPasswordSuccess){
              passwordError.style.display = "block";
              isPasswordSuccess = true;
          }
        if(validateForm()){
          messageContainer.style.display = 'block';
          if(!isPasswordMatching){
            console.log("invalid password");
           messageContentDiv.innerHTML=`<span class="close-message" id="closeMessage">&times;</span>
           <p id="messageContent">Password not matching! Try again.</p>`;
           const closeMessageButton = document.getElementById('closeMessage');
           closeMessageButton.addEventListener('click', () => {
            messageContainer.style.display = 'none';
            isPasswordMatching = true;
           });
          }
          else{
            messageContentDiv.innerHTML=`<p id="messageContent">Registeration Successful</p>`;
            setTimeout(redirectProfilePage,2000);
           
          }
      }
})
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
    window.location.href="./profile.html";
}

// validate form method for validating data
function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const  password = document.getElementById("password").value;
    const  confirmPassword = document.getElementById("confirmPass").value;

    if (name === "" || email === "" || password==="" || confirmPassword ==="") {
        isMandatoryFulfilled = false;
        return false;
    }
    if(!isValidPassword(password)){
        isPasswordSuccess = false;
        return false;
    }
    if(password!==confirmPassword){
        isPasswordMatching = false;
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

function isValidPassword(password) {
    // Define regular expressions for each condition
    const minLengthRegex = /.{8,}/;             // Minimum length of 8 characters
    const uppercaseRegex = /[A-Z]/;             // At least one uppercase letter
    const lowercaseRegex = /[a-z]/;             // At least one lowercase letter
    const digitRegex = /\d/;                    // At least one digit
    const specialCharRegex = /[!@#$%^&*()_+]/; // At least one special character

    // Check all conditions
    const hasMinLength = minLengthRegex.test(password);
    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasDigit = digitRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);

    // Check if all conditions are met
    return hasMinLength && hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
}
