class Validator {
  errors;
  inputField;
  constructor(config) {
    this.config = config;
    this.errors = [];
    this.addListeners();
    this.generateErrorsObject();
  }

  addListeners() {
    let inputField = document.querySelectorAll(".control input");
    inputField.forEach((field) => {
      field.addEventListener("input", this.check.bind(this));
    });
  }

  check(event) {
    let fieldValue = event.target.value;
    let fieldName = event.target.name;
    this.errors[fieldName] = [];

    if (this.config[fieldName].required) {
      if (fieldValue === "") {
        this.errors[fieldName].push("Input is empty");
      }
    }

    if (fieldValue.length < this.config[fieldName].minlength) {
      this.errors[fieldName].push(
        `The length should be more than ${this.config[fieldName].minlength} letters`
      );
    }
    if (fieldValue.length > this.config[fieldName].maxlength) {
      this.errors[fieldName].push(
        `The length should be less than ${this.config[fieldName].maxlength} letters`
      );
    }

    if (this.config[fieldName].email) {
      if (!this.validateEmail(fieldValue)) {
        this.errors[fieldName].push(`Type a correct EMAIL address`);
      }
      this.validateEmail(fieldValue);
    }
    if (this.config[fieldName].matching) {
      let pass1 = this.config[fieldName].matching;
      let selector = document.querySelector(`input[name="${pass1}"]`);

      if (fieldValue !== selector.value) {
        this.errors[fieldName].push(`Passwords are not the same`);
      }
      if (this.errors[fieldName].length === 0) {
        this.errors[fieldName] = [];
        this.errors[this.config[fieldName].matching] = [];
      }
    }

    this.displayMessage(fieldName);
  }

  validateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailformat.test(inputText)) {
      return true;
    }
    return false;
  }

  generateErrorsObject() {
    for (let field in this.config) {
      this.errors[field] = [];
    }
  }

  displayMessage(fieldName) {
    for (const elem of document.querySelectorAll("ul")) {
      elem.remove();
    }

    let control = document.querySelector(`[name="${fieldName}"]`).parentElement;
    let text = "";
    text += `<ul>`;
    for (let innerField in this.errors[fieldName]) {
      text += `<li>${this.errors[fieldName][innerField]}</li>`;
    }
    text += `</ul>`;
    control.insertAdjacentHTML("afterend", text);
  }
}
let validator = new Validator(config);
