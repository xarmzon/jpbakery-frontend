import validator from "validator";
import { MESSAGES } from "./constants";
import { IRegError, RegForm } from "./types";

export const validateEmail = (email: string) => {
    return validator.isEmail(email);
  };
  
  export const validateFullName = (fullName: string) => {
    return /^[a-zA-Z][a-zA-Z\s]{6,50}$/.test(fullName);
  };
  
  export const validateRegPassword = (password: string) => {
    const minLength = 6;
    const minSymbols = 0;
    return validator.isStrongPassword(password, { minLength, minSymbols });
  };
  
  export const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    return password === confirmPassword;
  };

export const validateAccountForm = (formData: RegForm, cPass = false) => {
    const errors: IRegError[] = [];
  
    const { fullName, email, password, cPassword } = formData;
  
    if (!validateFullName(fullName))
      errors.push({ name: "fullName", msg: MESSAGES.FORM.FULL_NAME });
  
    if (!validateEmail(email))
      errors.push({ name: "email", msg: MESSAGES.FORM.EMAIL });
  
    if (!validateRegPassword(password))
      errors.push({ name: "password", msg: MESSAGES.FORM.PASSWORD });
  
    if (cPass) {
      if (!validateConfirmPassword(password, cPassword as string))
        errors.push({
          name: "cPassword",
          msg: MESSAGES.FORM.CPASSWORD,
        });
    }
  
    return errors;
  };


  export const formatPrice = (price: string | number) => {
    let priceToConvert: number;
    if (typeof price === "string") {
      priceToConvert = parseFloat(price);
    } else {
      priceToConvert = price;
    }
  
    return new Intl.NumberFormat("en-Us").format(priceToConvert);
  };
  

 
export const getErrorMessage = (e: any) => {
  return e?.response?.msg
    ? e?.response?.msg
    : e?.response?.data?.msg ? e?.response?.data?.msg: e?.message
    ? e?.message
    : MESSAGES.GENERAL_ERROR_MESSAGE;
};
