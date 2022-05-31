
export  const  Password = function(rule, value, callback) {
    // var validatePass = (rule, value, callback) => {
    if (value.length) {
      callback()
    } else {
      callback(new Error('The password can not be less than'))

    }
    // };
  };
export const Email = function(rule, value, callback) {
    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      callback()
    } else {
      callback(new Error('Ввод электронной почты обязателен'))
    }
  };
export const Default = function(role, value, callback) {
  if (value === '') {
    callback(new Error('Пожалуйста, заполните это поле'));
  } else  if (value) {
    callback()
  }
};
export const PhoneNumber = function(rule, value, callback) {
    if (/^[+][9][9][8]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error(''))
      }
}
