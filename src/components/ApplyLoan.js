import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {schema} from '../Data/ApplyLoanSchema'

//This component is responsible for applying loan and related activities
const ApplyLoan = (props) => {

    //According to type of loan selected differnet interest rate are applied
    var [interestRate, showInterestRate] = useState('');
    //According to type of loan selected different fields are shown, depending upon the value of this variable different fields are shown
    var [field, showfield] = useState('');

    //This function handles the event that takes places after "Apply loan" submit button is clicked
    const onSubmitHandler = (data) => {
        //Stack up all the loan information in result variable
        var result = { ...data, InterestRate: interestRate, LoanIssueDate: '' }
        const url = `/Dashboard`;
        //prevLoanApplied variable includes all the perviously applied loans of the current user.
        var prevLoanApplied = [...props.currentUser.loanApplied];
        //Updating prevLoanApplied list by pushing information regarding the latest loan applied.
        prevLoanApplied.push(result);
        //Updates CurrentUser information
        var dupCurrentUser = { ...props.currentUser, loanApplied: prevLoanApplied }
        //Make changes to the db and state
        props.startAddingLoan(dupCurrentUser, props.index, props.currentUser.id);
        props.onApplyLoan(props.index, url);

    }

    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    });

    //This function assign values of showInterestRate and showfield variable according to type of loan selected
    const onloanTypeChange = (val) => {
        if (val === "Education") {
            showInterestRate(5)
            showfield('t1')
        }
        else if (val === "Personal") {
            showInterestRate(10)
            showfield('t2')
        }
        else {
            showInterestRate(7)
            showfield('t2')
        }

    }
    var backurl = `/Dashboard`;
    return (

        <div data-test="component-ApplyLoan" className="dd container mt-5 mb-5  ">
            <Helmet>
                <style>{'body { background-color: rgb(139, 205, 228)}'}</style>
            </Helmet>
            <Link className="btn btn-primary inner mt-3" to={backurl}> BacK</Link>
            <button className="btn btn-success float-left topcorner" onClick={props.onLogOut}>Log out</button> <br />
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-6">
                    <div className="Form">
                        <div className="display-5 loginlabel ms-5">Apply for Loan</div>
                        <br />
                        <div className="inputs">
                            <form data-test="component-ApplyLoan-form" onSubmit={handleSubmit(onSubmitHandler)}>
                                <label className="ms-2 form-label">Loan Type</label>
                                <select data-test="component-ApplyLoan-loanType" name="loanType" className="ms-2 bg-light dropdown-item w-50" defaultValue={''}   {...register("loanType")}
                                    onChange={(e) => { onloanTypeChange(e.target.value); setValue('select', e.target.value, { shouldValidate: true }) }}>
                                    <option value="" disabled>Select a Loan Type</option>
                                    <option value="Education">Education</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Housing">Housing</option>
                                </select><br />
                                <p data-test="component-ApplyLoan-loanType-error" className="loginerror"> {errors.loanType?.message} </p>

                                <label className="ms-2 form-label">Interest Rate</label>
                                <input data-test="component-ApplyLoan-InterestRate" className="ms-2 bg-dark dropdown-item w-50" name="InterestRate" type="text" disabled value={interestRate} placeholder="Interest Rate" /><br />

                                <label className="ms-2 form-label">Loan Amount</label>
                                <input data-test="component-loanAmount" {...register("loanAmount")} type="text" className="ms-2 bg-light dropdown-item w-50" name="loanAmount" placeholder="Loan Amount" />
                                <p data-test="component-loanAmount-error" className="loginerror"> {errors.loanAmount?.message} </p>

                                <label className="ms-2 form-label">Loan Apply Date</label>
                                <input data-test="component-loanApplyDate" {...register("loanApplyDate")} className="ms-2 bg-light dropdown-item w-50" name="loanApplyDate" type="date" />
                                <p data-test="component-loanApplyDate-error" className="loginerror"> {errors.loanApplyDate?.message} </p><br />

                                <label className="ms-2 form-label">Duration Of Loan</label>
                                <select data-test="component-durationOfLoan" className="ms-2 bg-light dropdown-item w-50" name="durationOfLoan" defaultValue={''}   {...register("durationOfLoan")}
                                    onChange={(e) => setValue('select', e.target.value, { shouldValidate: true })}>
                                    <option value="" disabled>Select Loan Duration</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>

                                </select><br />
                                <p data-test="component-durationOfLoan-error" className="loginerror"> {errors.durationOfLoan?.message} </p><br />
                                {field === 't1' && <div>
                                    <label className="ms-2 form-label">Course Fees</label>
                                    <input data-test="component-courseFee" {...register("courseFee")} className="ms-2 bg-light dropdown-item w-50" type="text" name="courseFee" placeholder="Course Fee" />
                                    <p data-test="component-courseFee-error" className="loginerror"> {errors.courseFee?.message} </p><br />

                                    <label className="ms-2 form-label">Course</label>
                                    <input data-test="component-course" {...register("course")} className="ms-2 bg-light dropdown-item w-50" type="text" name="course" placeholder="Course" />
                                    <p data-test="component-course-error" className="loginerror"> {errors.course?.message} </p><br />

                                    <label className="ms-2 form-label">Father Name</label>
                                    <input data-test="component-fatherName" {...register("fatherName")} className="ms-2 bg-light dropdown-item w-50" type="text" name="fatherName" placeholder="Father Name" />
                                    <p data-test="component-fatherName-error" className="loginerror"> {errors.fatherName?.message} </p><br />

                                    <label className="ms-2 form-label">Father Occupation</label>
                                    <input {...register("fatherOccupation")} className="ms-2 bg-light dropdown-item w-50" type="text" name="fatherOccupation" placeholder="Father Occupation" />
                                    <p className="loginerror"> {errors.fatherOccupation?.message} </p><br />

                                    <label className="ms-2 form-label">Father Total Experience</label>
                                    <input {...register("fatherTotalExp")} className="ms-2 bg-light dropdown-item w-50" type="text" name="fatherTotalExp" placeholder="Father Total Experience" />
                                    <p className="loginerror"> {errors.fatherTotalExp?.message} </p><br />

                                    <label className="ms-2 form-label">Father Experience With Current Company</label>
                                    <input {...register("fatherExpCurrent")} className="ms-2 bg-light dropdown-item w-50" type="text" name="fatherExpCurrent" placeholder="Father Experience with Current Company" />
                                    <p className="loginerror"> {errors.fatherExpCurrent?.message}  </p><br />

                                    <label className="ms-2 form-label">Ration Card Number</label>
                                    <input {...register("rationCardNo")} className="ms-2 bg-light dropdown-item w-50" type="text" name="rationCardNo" placeholder="Ration CardNo" />
                                    <p className="loginerror"> {errors.rationCardNo?.message} </p><br />

                                </div>}

                                {field === 't2' && <div>
                                    <label className="ms-2 form-label">Company Name</label>
                                    <input {...register("companyName")} className="ms-2 bg-light dropdown-item w-50" type="text" name="companyName" placeholder="Company Name" />
                                    <p className="loginerror"> {errors.companyName?.message} </p><br />

                                    <label className="ms-2 form-label">Designation</label>
                                    <input {...register("designation")} className="ms-2 bg-light dropdown-item w-50" type="text" name="designation" placeholder="Designation" />
                                    <p className="loginerror"> {errors.designation?.message} </p><br />

                                    <label className="ms-2 form-label">Total Experience</label>
                                    <input {...register("totalExp")} className="ms-2 bg-light dropdown-item w-50" type="text" name="totalExp" placeholder="Total Experience" />
                                    <p className="loginerror"> {errors.totalExp?.message} </p><br />

                                    <label className="ms-2 form-label">Experience With Current Company</label>
                                    <input {...register("expCurrentCompany")} className="ms-2 bg-light dropdown-item w-50" type="text" name="expCurrentCompany" placeholder="Experience with Current Company" />
                                    <p className="loginerror"> {errors.expCurrentCompany?.message} </p><br />
                                </div>}
                                {field !== '' && <div>
                                    <label className="ms-2 form-label">Annual Income</label>
                                    <input {...register("annualIncome")} type="text" className="ms-2 bg-light dropdown-item w-50" name="annualIncome" placeholder="Annual Income" />
                                    <p className="loginerror"> {errors.annualIncome?.message} </p>
                                </div>}
                                <button className="btn btn-primary" type="submit">Apply</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ApplyLoan