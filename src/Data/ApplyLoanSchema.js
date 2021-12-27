import * as yup from "yup";

export const schema = yup.object().shape({
    loanType: yup.string().required("Loan Type is a required field"),
    loanAmount: yup.number().typeError('you must specify a number').positive().min(1, "Loan Amount Should be greater than 0"),
    loanApplyDate: yup.date().typeError('you must give a proper date').required("Loan Apply Date is a required feild").min(new Date(Date.now() - (3600 * 1000 * 24)), "Loan apply date should not be lesser than system date"),
    durationOfLoan: yup.string().required("Loan Duration is a required field"),
    courseFee: yup.string().when("loanType", (loanType) => {
        if (loanType === "Education")
            return yup.number().typeError('you must specify a number').positive().required("Course Fee is a required Field");
    }),
    course: yup.string().when("loanType", (loanType) => {
        if (loanType === "Education")
            return yup.string().required("Course is a required Field");
    }),
    fatherName: yup.string().when("loanType", (loanType) => {
        if (loanType === "Education")
            return yup.string().required("Father's Name is a required Field").matches(/^[a-zA-Z ]*$/, "Only Alphabets and Space is allowed");
    }),
    fatherOccupation: yup.string().when("loanType", (loanType) => {
        if (loanType === "Education")
            return yup.string().required("Father's Occupation is a required Field");
    }),
    fatherTotalExp: yup.string().when("loanType", (loanType) => {
        if (loanType === "Education")
            return yup.number().typeError('you must specify a number').positive().required("Father's Total Experience is a required Field");
    }),
    fatherExpCurrent: yup.string().when("loanType", (loanType) => {
        if (loanType === "Education")
            return yup.number().typeError('you must specify a number').positive().required("This is a required Field");
    }),
    rationCardNo: yup.string().when("loanType", (loanType) => {
        if (loanType === "Education")
            return yup.number().typeError('you must specify a number').required("This is a required Field");
    }),

    annualIncome: yup.number().typeError('you must specify a number').required("This is a required Field"),

    companyName: yup.string().when("loanType", (loanType) => {
        if (loanType !== "Education")
            return yup.string().required("This is a required Field");
    }),
    designation: yup.string().when("loanType", (loanType) => {
        if (loanType !== "Education")
            return yup.string().required("This is a required Field");
    }),
    totalExp: yup.string().when("loanType", (loanType) => {
        if (loanType !== "Education")
            return yup.number().typeError('you must specify a number').positive().required("This is a required Field");
    }),
    expCurrentCompany: yup.string().when("loanType", (loanType) => {
        if (loanType !== "Education")
            return yup.number().typeError('you must specify a number').positive().required("This is a required Field");
    }),


});
