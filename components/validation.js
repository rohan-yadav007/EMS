const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validator = (type, value) => {
  // alert(type)
  switch (type) {
    case 'email':
      if (value === '') {
        return 'Required!';
      } else {
        if (emailRegex.test(value)) {
          return '';
        } else {
          return 'Invalid!';
        }
      }

    case 'password':
      if (value === '') {
        return 'Required!';
      } else {
        return '';
      }

    default:
      break;
  }
};
export default validator;
