import * as yup from "yup";

export const schema = yup.object().shape({
    FullName: yup.string().required("Full Name is a required field").matches(/^[a-zA-Z ]*$/, "Only Alphabets and Space is allowed"),
    Username: yup.string().required("Username  is a required field"),
    Password: yup.string().required('Please Enter your password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
    Guardian_Type: yup.string().required("Guardian Type is a required field"),
    Guardian_Name: yup.string().required("Gaurdian Name is a required field"),
    Address: yup.string().required("Address  is a required field"),
    Citizienship: yup.string().required("Citizienship  is a required field"),
    Email: yup.string().email().required("Email  is a required field"),
    Gender: yup.string().required("Gender  is a required field"),
    MaritalStatus: yup.string().required("Marital Status  is a required field"),
    ContactNumber: yup.string().required("Contact Number  is a required field").matches(/^[0-9]+$/, "Must be only digits").min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits'),
    RegistrationDate: yup.date().default(() => (new Date())),
    dob: yup.date("Enter a proper Date").max(yup.ref('RegistrationDate'), "Enter a proper Date of Birth"),
    accountType: yup.string().required("Account Type  is a required field"),
    initialAmount: yup.number().when("accountType", (accountType) => {
        if (accountType === "Saving")
            return yup.number().typeError('you must specify a number').required("Initial Amount  is a required field").min(5000, "Minimum Amount for Saving Account is 5000")
        else
            return yup.number().typeError('you must specify a number').positive().required("Initial Amount  is a required field")
    }

    ),
    branchName: yup.string().required("Branch Name  is a required field"),
    identificationProofType: yup.string().required("This  is a required field"),
    docNumber: yup.string().when("identificationProofType", (identificationProofType) => {
        if (identificationProofType === "PAN")
            return yup.string().required("Enter PAN number Please").matches(/^[a-zA-Z0-9]{12}$/, "Enter Proper PAN card Number")
        else
            return yup.string().required("Enter Proper Adhaar Number")
    }
    ),
    refAccountHolderName: yup.string().required("This  is a required field").matches(/^[a-zA-Z ]*$/, "Only Alphabets and Space is allowed"),
    refAccountHolderAccNo: yup.string().required("This  is a required field").matches(/^[0-9]{16}$/, "Enter a Proper Account Number"),
    refAccountHolderAddr: yup.string().required("This  is a required field"),

});