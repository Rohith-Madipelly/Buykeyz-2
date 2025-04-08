import * as Yup from "yup";


const validDomains = ["gmail.com", "yahoo.com","ymail.in","myyahoo.com"]; 
const validExtensions = ["com", "org", "net", "edu", "gov", "mil", "in", "us", "uk", "au", "ca", "eu"];


export const EmailValidations=Yup.string()
  .required("Email is required")
  .trim("") // Removes leading and trailing spaces
  .strict("Email cannot start with a space.") // Ensures no spaces-only input
  .matches(/^(?!\s*$).+/, "Field cannot be empty or only spaces") 

  .test("no-leading-space", "Email cannot start with a space", (value) => {
    if (!value) return false;
    return !/^\s/.test(value);
  })
  .test("no-middle-space", "Email cannot contain spaces", (value) => {
    if (!value) return false;
    return !/\s/.test(value);
  })

  .test("valid-start", "Email must not start with special characters", (value) => {
    if (!value) return false;
    return /^[a-zA-Z0-9]/.test(value); // Ensures email starts with a letter or number
  })

  .test("no-multiple-at", "Invalid email format (contains multiple '@')", (value) => {
    if (!value) return false;
    return (value.match(/@/g) || []).length <= 1; // Ensures exactly one '@'
  })

  .test("single-at", "Invalid email format. Missing '@' in email.", (value) => {
    if (!value) return false;
    return value.includes("@"); // Ensures '@' is present
  })

  .test("valid-tld", "Invalid email format. Missing '.' in domain.", (value) => {
    if (!value) return false;
    return /\.[a-zA-Z]{0,}$/.test(value); // Ensures there's a '.' followed by at least 2 letters
  })

  
  .test(
    "valid-dot",
    "Invalid email format. Dot (.) cannot be at the consecutively.",
    (value) => {
      if (!value) return false;
      return !/^\.|\.{2,}|\.@$/.test(value); // Prevents . at start, end, or consecutive ..
    }
  )
  .email("Invalid email format")

  // .test("valid-domain", "Invalid email domain", (value) => {
  //   if (!value) return false;
  //   const domain = value.split("@")[1];
  //   return validDomains.includes(domain);
  // })


  .test("valid-extension", "Invalid email extension", (value) => {
    if (!value) return false;
    const extension = value.split(".").pop();
    return extension && validExtensions.includes(extension);
  })
