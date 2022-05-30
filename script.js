let config = {
  username: {
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    required: true,
    email: true,
    minlength: 3,
    maxlength: 50,
  },
  number: {
    minlength: 9,
    maxlength: 13,
  },
  password: {
    minlength: 7,
    maxlength: 25,
    matching: "repeat-password",
    required: true,
  },
  "repeat-password": {
    minlength: 7,
    maxlength: 25,
    matching: "password",
    required: true,
  },
};
