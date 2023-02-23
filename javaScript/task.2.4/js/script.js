"use strict";

// slider control
const changeSliderValue = (value) => {
    document.getElementById("income-label").innerText = value + " K";
};
//form control

class FormValidator {
    constructor(form) {
      this.form = form;
    }
  
    validateFirstName() {
      const firstName = this.form.elements.firstName.value;
      const firstNameError = document.getElementById("first-name-error");
      if (!firstName) {
        firstNameError.textContent = "First name is required!";
        return false;
      } else if (!/^[a-zA-Z]+$/.test(firstName)) {
        firstNameError.textContent = "First name should contain only letters!";
        return false;
      } else {
        firstNameError.textContent = "";
        return true;
      }
    }
  
    validateLastName() {
      const lastName = this.form.elements.lastName.value;
      const lastNameError = document.getElementById("last-name-error");
      if (!lastName) {
        lastNameError.textContent = "Last name is required!";
        return false;
      } else if (!/^[a-zA-Z]+$/.test(lastName)) {
        lastNameError.textContent = "Last name should contain only letters!";
        return false;
      } else {
        lastNameError.textContent = "";
        return true;
      }
    }
  
    validateEmail() {
      const email = this.form.elements.email.value;
      const emailError = document.getElementById("email-error");
      if (!email) {
        emailError.textContent = "Email is required!";
        return false;
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        emailError.textContent = "Invalid email address!";
        return false;
      } else {
        emailError.textContent = "";
        return true;
      }
    }
  
    validatePassword() {
      const password = this.form.elements.password.value;
      const passwordError = document.getElementById("password-error");
      if (!password) {
        passwordError.textContent = "Password is required!";
        return false;
      } else if (password.length < 8) {
        passwordError.textContent = "Password should be at least 8 characters long!";
        return false;
      } else {
        passwordError.textContent = "";
        return true;
      }
    }
  
    validateConfirmPassword() {
      const password = this.form.elements.password.value;
      const confirmPassword = this.form.elements.confirmPassword.value;
      const confirmPasswordError = document.getElementById("confirm-password-error");
      if (!confirmPassword) {
        confirmPasswordError.textContent = "Confirm password is required!";
        return false;
      } else if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match!";
        return false;
      } else {
        confirmPasswordError.textContent = '';
        return true;
      }
    }

    validateDate () {
      const date = this.form.elements.date.value;
      const dateError = document.getElementById("date-error");
      const dateRegex = /^\d{2}([./-])\d{2}\1\d{4}$/;
      if (!date) {
      dateError.textContent = "Date is required!";
      return false;
      } else if (!dateRegex.test(date)) {
      dateError.textContent = "Please keep correct format of date (dd/mm/yyyy)!";
      return false;
      } else {
      dateError.textContent = '';
      return true;    
      }
    }
  
    validateForm() {
      return this.validateFirstName(), 
      this.validateLastName(), 
      this.validateEmail(), 
      this.validatePassword(),  
      this.validateConfirmPassword(), 
      this.validateDate ();
    }
}
  
const form = document.getElementById('form');
const validator = new FormValidator(form);
  
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validator.validateForm()) {
      form.submit();
    }
});