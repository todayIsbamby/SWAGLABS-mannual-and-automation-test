export const credentials = {
  username: 'standard_user',
  password: 'secret_sauce',
};
 
export const validUser = {
  firstName: 'Nisachol',
  lastName: 'Yudee',
  zipCode: '11111',
};
 
export const emptyUser = {
  firstName: '',
  lastName: '',
  zipCode: '',
};
 
export const firstNameOnly = {
  firstName: 'Nisachol',
  lastName: '',
  zipCode: '',
};
 
export const lastNameOnly = {
  firstName: '',
  lastName: 'Yudee',
  zipCode: '',
};
 
export const zipCodeOnly = {
  firstName: '',
  lastName: '',
  zipCode: '11111',
};
 
export const missingFirstName = {
  firstName: '',
  lastName: 'Yudee',
  zipCode: '11111',
};
 
export const missingLastName = {
  firstName: 'Nisachol',
  lastName: '',
  zipCode: '11111',
};
 
export const missingZipCode = {
  firstName: 'Nisachol',
  lastName: 'Yudee',
  zipCode: '',
};
 
// Expected error messages returned by SauceDemo
export const errorMessages = {
  firstNameRequired: 'Error: First Name is required',
  lastNameRequired:  'Error: Last Name is required',
  zipCodeRequired:   'Error: Postal Code is required',
};