import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { schema } from '../Data/FormSchema'

//This Comoponent deals with user registration and changing user details.
const Form = (props) => {
    //This variables is to determine whether a user has registered successfully or not.
    var [registered, changeRegistered] = useState(false);
    //This variable stores country of the user.
    var [country, selectCountry] = useState(props.currentUser?.Country || '');
    //This variable stores state/region of the user.
    var [region, selectRegion] = useState(props.currentUser?.State || '');
    //This variable stores age of the user.
    var [Age, setDate] = useState(props.currentUser?.Age || 0);
    //This variable determines whether to show age field to users. 
    var [show, showAge] = useState(props.update);
    //This variable determines whether to show age error message which is to be displayed when a user is minor or more than 96 years old.
    var [ageErrorMssg, showMssg] = useState('');
    var [status, changeStatus] = useState(true);
    var [citizenStatus, changeCitizenStatus] = useState(props.currentUser?.CitizenStatus || '');
    //This variable sets initial deposit amount based on type of account selected
    var [initialDeposit, setInitialDeposit] = useState(props.currentUser?.initialAmount || 0);
    var [depositStatus, changeDepositStatus] = useState(props.update);
    var [docStatus, changeDocStatus] = useState(props.update);
    //This varibale stores the newly generated cusrtomer id after registration.
    var [customerid, changeCustomerId] = useState('');
    //This varibale stores the newly generated Account Number after registration.
    var [accountNumber, changeAccountNumber] = useState('');

    //This function handles the event that takes places after "register" submit button is clicked.
    const onSubmitHandler = (data) => {
        data.dob = (data.dob).toISOString().substr(0, 10);
        var result;
        //udapte variable in props determine wether the component was called to act like a registration page or change detail page. 
        //If update is true then all the form fields are populated with the current user details and on update the current user details gets updated in db and state.
        if (props.update) {
            //All the details are stacked together in result object.
            result = { ...data, "Age": Age, "RegistrationDate": props.currentUser.RegistrationDate, "CitizenStatus": citizenStatus, "Country": country, "State": region, "CustomerId": props.currentUser.CustomerId, "AccountNumber": props.currentUser.AccountNumber, "loanApplied": props.currentUser.loanApplied, "id": props.currentUser.id }
            const url = `/Dashboard`;
            props.startAddingLoan(result, props.index, props.currentUser.id);
            props.onUpdateDetails(props.index, url);
        }
        //If update is false then all form fields are blanked. On successful registration a customer id and account number is generated and new user with all these details gets added in the db.
        else {
            data.RegistrationDate = (data.RegistrationDate).toISOString().substr(0, 10);
            //Customer ID and Account Number is generated.
            var customeridTemp = `R-${props.users.length + 1 + 100}`;
            var accountNumberTemp = Math.floor(1000000000000000 + Math.random() * 9000000000000000)
            //All the details are stacked together in result object.
            result = { ...data, "Age": Age, "CitizenStatus": citizenStatus, "Country": country, "State": region, "CustomerId": customeridTemp, "AccountNumber": accountNumberTemp, "loanApplied": [] }
            changeCustomerId(customeridTemp);
            changeAccountNumber(accountNumberTemp)
            props.startAddingUser(result)
            //Change registered state variable value by which the generated Customer ID and Account Number is shown to the user.
            changeRegistered(true)
        }
    }

    //This function sets the intial deposit amount according to account type selected.
    const handleAccountChange = (val) => {
        changeDepositStatus(true);
        if (val === 'Saving') {
            setInitialDeposit(5000);
        }
        else {
            setInitialDeposit(0);
        }
    }

    //This function calculates the age and accordingly classify user as minor,normal or senior based on date of birth they have selected.
    const handleDateChange = (val) => {
        var today = new Date();
        var birthDate = new Date(val);
        //Calculates User age using their date of birth.
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        //Show age field to user with the calculated age.
        showAge(true);
        if (age < 0) { age = 0 }
        setDate(age);
        if (age < 18) {
            showMssg("Minimum Age is 18");
            //Age is less than 18, the user is not eligible and hence the form submit button gets disabled.
            changeStatus(false);
            changeCitizenStatus('Minor');
        }
        else if (age > 96) {
            showMssg("Maximum Age is 96");
            //Age is more than 96, the user is not eligible and hence the form submit button gets disabled.
            changeStatus(false);
            changeCitizenStatus('Senior');
        }
        else {
            showMssg('');
            changeStatus(true);
            if (age > 60) {
                changeCitizenStatus('Senior');
            }
            else {
                changeCitizenStatus('Normal');
            }
        }
    }

    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    });
    const dateRegister = register("dob");
    const amountRegister = register("initialAmount")
    var backurl = '/'

    if (props.update)
        backurl = `/Dashboard`;

    return (

        <div data-test="component-forms" className="dd container mt-5 mb-5 ">
            <Helmet>
                <style>{'body { background-color: #db6363 }'}</style>
            </Helmet>
            <Link className="btn btn-primary inner mt-3" to={backurl}> BacK</Link>
            {props.update &&
                <div>

                    <button className="btn btn-success float-left topcorner" onClick={props.onLogOut}>Log out</button> <br />
                </div>
            }
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-6">

                    <div className="cardform px-5 py-5">
                        {props.update &&
                            <div className="display-5">Update Details</div>

                        }
                        {!props.update &&
                            <div className="display-5">Sign up</div>

                        }
                        {!registered &&
                            <form onSubmit={handleSubmit(onSubmitHandler)}>
                                <br />
                                <div className="form-input">
                                    <label className="form-label col-25">Name</label>
                                    <input data-test="component-form-FullName" {...register("FullName")} className="form-control" type="text" name="FullName" placeholder="Name" defaultValue={props.currentUser?.FullName || ''} />
                                    <p data-test="component-form-FullName-error" className="errorMsg">{errors.FullName?.message}</p>
                                </div>

                                <div className="form-input">
                                    <label className="form-check-label">User Name</label>
                                    <input data-test="component-form-UserName"  {...register("Username")} className="form-control" type="text" name="Username" placeholder="Username" defaultValue={props.currentUser?.Username || ''} />
                                    <p data-test="component-form-UserName-error" className="errorMsg"> {errors.Username?.message} </p>
                                </div>

                                <div className="form-input">
                                    <label className="form-check-label">Password</label>
                                    <input data-test="component-form-Password" {...register("Password")} className="form-control" type="Password" name="Password" placeholder="Password" defaultValue={props.currentUser?.Password || ''} />
                                    <p data-test="component-form-Password-error" className="errorMsg"> {errors.Password?.message} </p>
                                </div>

                                <div className="form-input">
                                    <label className="form-check-label ">Gaurdian Type</label>
                                    <input data-test="component-form-GaudianType"  {...register("Guardian_Type")} className="form-control" type="text" name="Guardian_Type" placeholder="Guardian Type" defaultValue={props.currentUser?.Guardian_Type || ''} />
                                    <p data-test="component-form-GaudianType-error" className="errorMsg"> {errors.Guardian_Type?.message} </p>
                                </div>

                                <div className="form-input">
                                    <label className="form-check-label ">Gaurdian Name</label>
                                    <input data-test="component-form-GaudianName" {...register("Guardian_Name")} className="form-control" type="text" name="Guardian_Name" placeholder="Guardian Name" defaultValue={props.currentUser?.Guardian_Name || ''} />
                                    <p data-test="component-form-GaudianName-error" className="errorMsg"> {errors.Guardian_Name?.message} </p>
                                </div>

                                <div className="form-input">
                                    <label className="form-check-label ">Country</label>
                                    <CountryDropdown className=" bg-light dropdown-item" name="Country"
                                        defaultOptionLabel="Select a country"
                                        value={country}
                                        onChange={selectCountry} required />
                                </div>


                                <div className="form-input">
                                    <label className="form-check-label ">State</label>
                                    <RegionDropdown className=" bg-light dropdown-item" name="State"
                                        blankOptionLabel="No country selected"
                                        defaultOptionLabel="Now select a State"
                                        country={country}
                                        value={region}
                                        onChange={selectRegion} required />
                                </div>

                                <br />
                                <div className="form-input">
                                    <label className="form-check-label ">Citizienship</label>
                                    <select data-test="component-form-Citizienship" className=" bg-light dropdown-item" name="Citizienship" defaultValue={props.currentUser?.Citizienship || ''}   {...register("Citizienship")}
                                        onChange={(e) => setValue('select', e.target.value, { shouldValidate: true })}>
                                        <option value="" disabled>Select an Option</option>
                                        <option value="Permanent">Permanent</option>
                                        <option value="Temporary">Temporary</option>
                                    </select><br />
                                </div>
                                <p data-test="component-form-Citizienship-error" className="errorMsg"> {errors.Citizienship?.message} </p>


                                <div className="form-input">
                                    <label className="form-check-label ">Address</label>
                                    <input data-test="component-form-Address"  {...register("Address")} className="form-control" type="text" defaultValue={props.currentUser?.Address || ''} name="Address" placeholder="Address" />
                                    <p data-test="component-form-Address-error" className="errorMsg"> {errors.Address?.message} </p>
                                </div>


                                <div className="form-input">
                                    <label className="form-check-label ">Email</label>
                                    <input data-test="component-form-Email"  {...register("Email")} className="form-control" type="Email" defaultValue={props.currentUser?.Email || ''} name="Email" placeholder="Email" />
                                    <p data-test="component-form-Email-error" className="errorMsg"> {errors.Email?.message} </p>
                                </div>

                                <div className="form-input">
                                    <label className="form-check-label ">Gender</label>
                                    <select data-test="component-form-Gender" name="Gender" className=" bg-light dropdown-item" defaultValue={props.currentUser?.Gender || ''}   {...register("Gender")}
                                        onChange={(e) => setValue('select', e.target.value, { shouldValidate: true })}>
                                        <option value="" disabled>Select an Option</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                        <option value="NotDisclose">I prefer not to tell</option>
                                    </select><br />
                                    <p data-test="component-form-Gender-error" className="errorMsg"> {errors.Gender?.message} </p>
                                </div>

                                <div className="form-input">
                                    <label className="form-check-label ">Marital Status</label>
                                    <select data-test="component-form-MaritalStatus" name="MaritalStatus" className=" bg-light dropdown-item" defaultValue={props.currentUser?.MaritalStatus || ''}    {...register("MaritalStatus")}
                                        onChange={(e) => setValue('select', e.target.value, { shouldValidate: true })}>
                                        <option value="" disabled>Select an Option</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">Divorced</option>
                                    </select><br />
                                    <p data-test="component-form-MaritalStatus-error" className="errorMsg"> {errors.MaritalStatus?.message} </p>
                                </div>


                                <div className="form-input">
                                    <label className="form-check-label ">Contact Number</label>
                                    <input data-test="component-form-ContactNumber" className="form-control" {...register("ContactNumber")} defaultValue={props.currentUser?.ContactNumber || ''} type="text" name="ContactNumber" placeholder="Contact Number" />
                                    <p data-test="component-form-ContactNumber-error" className="errorMsg"> {errors.ContactNumber?.message} </p>
                                </div>


                                <div className="form-input ">
                                    <label className="form-check-label ">Date of birth</label>
                                    <input data-test="component-form-dob" className="form-control bg-light" name="dob" type="date" defaultValue={props.currentUser?.dob || ''} onChange={(e) => {
                                        dateRegister.onChange(e);
                                        handleDateChange(e.target.value);
                                    }}
                                        ref={dateRegister.ref} />
                                    <p className="errorMsg"> {errors.dob?.message} </p>
                                </div>



                                {show && <div className="form-input"> <label className="form-check-label ">Age</label><input data-test="component-form-Age" className="form-control" disabled value={Age} /> </div>}


                                {show && <div className="form-input"> <label className="form-check-label ">Citizen Status</label><input data-test="component-form-CitizenStatus" className="form-control" disabled value={citizenStatus} /> </div>}
                                <p data-test="component-form-dob-error" className="errorMsg">{ageErrorMssg}</p>


                                <div className="form-input">
                                    <label className="form-check-label ">Account Type</label>
                                    <select data-test="component-form-dob-accountType" className=" bg-light dropdown-item" name="accountType" defaultValue={props.currentUser?.accountType || ''}   {...register("accountType")}
                                        onChange={(e) => {
                                            handleAccountChange(e.target.value); setValue('select', e.target.value, { shouldValidate: true });
                                        }}>
                                        <option value="" disabled>Select a Account Type</option>
                                        <option value="Saving">Saving</option>
                                        <option value="Salary">Salary</option>
                                    </select><br />
                                    <p data-test="component-form-dob-accountType-error" className="errorMsg"> {errors.accountType?.message} </p>
                                </div>

                                <div className="form-input">
                                    <label className="form-check-label ">Initial Amount</label>
                                    <input data-test="component-form-initialAmount" className="form-control" onChange={(e) => {
                                        amountRegister.onChange(e); setInitialDeposit(e.target.value);
                                    }} ref={amountRegister.ref}
                                        disabled={!depositStatus} value={initialDeposit} type="text" name="initialAmount" placeholder="Initial Deposit" />
                                    <p className="errorMsg"> {errors.initialAmount?.message} </p>
                                </div>

                                <div className="form-input">
                                    <label className="form-check-label ">Branch Name</label>
                                    <input data-test="component-form-branchName" className="form-control" {...register("branchName")} defaultValue={props.currentUser?.branchName || ''} type="text" name="branchName" placeholder="Branch Name" />
                                    <p data-test="component-form-branchName-error" className="errorMsg"> {errors.branchName?.message} </p>
                                </div>


                                <div className="form-input">
                                    <label className="form-check-label ">Identification proof</label>
                                    <select data-test="component-form-identificationProofType" className=" bg-light dropdown-item" name="identificationProofType" defaultValue={props.currentUser?.identificationProofType || ''}   {...register("identificationProofType")}
                                        onChange={(e) => {
                                            changeDocStatus(true); setValue('select', e.target.value, { shouldValidate: true });
                                        }}>
                                        <option value="" disabled>Select the Proof Type</option>
                                        <option value="PAN">PAN</option>
                                        <option value="Adhaar">Adhaar</option>
                                    </select><br />
                                    <p data-test="component-form-identificationProofType-error" className="errorMsg"> {errors.identificationProofType?.message} </p>
                                </div>


                                <div className="form-input">
                                    <label className="form-check-label ">Document Number</label>
                                    <input data-test="component-form-docNumber" className="form-control" {...register("docNumber")} defaultValue={props.currentUser?.docNumber || ''} disabled={!docStatus} type="text" name="docNumber" placeholder="Documnet number" />
                                    <p data-test="component-form-docNumber-error" className="errorMsg"> {errors.docNumber?.message} </p>
                                </div>

                                <div className="form-input">
                                    <label className="form-check-label ">Ref Account Holder Name</label>
                                    <input data-test="component-form-refAccountHolderName" className="form-control" {...register("refAccountHolderName")} type="text" defaultValue={props.currentUser?.refAccountHolderName || ''} name="refAccountHolderName" placeholder="Enter Nominee Name" />
                                    <p data-test="component-form-refAccountHolderName-error" className="errorMsg"> {errors.refAccountHolderName?.message} </p>
                                </div>

                                <div className="form-input">
                                    <label className="form-check-label ">Ref Account Holder AccNo</label>
                                    <input data-test="component-form-refAccountHolderAccNo" className="form-control" {...register("refAccountHolderAccNo")} type="text" defaultValue={props.currentUser?.refAccountHolderAccNo || ''} name="refAccountHolderAccNo" placeholder="Enter Nominee Account Number" />
                                    <p data-test="component-form-refAccountHolderAccNo-error" className="errorMsg"> {errors.refAccountHolderAccNo?.message} </p>
                                </div>

                                <div className="form-input">
                                    <label className="form-check-label ">Ref Account Holder Addr</label>
                                    <input data-test="component-form-refAccountHolderAddr" className="form-control" {...register("refAccountHolderAddr")} type="text" defaultValue={props.currentUser?.refAccountHolderAddr || ''} name="refAccountHolderAddr" placeholder="Enter Nominee Address" />
                                    <p data-test="component-form-refAccountHolderAddr-error" className="errorMsg"> {errors.refAccountHolderAddr?.message} </p>
                                </div>


                                <button data-test="component-form-submit" type="submit" className="btn btn-success" disabled={!status} >{props.update && <p>Update</p>}
                                    {!props.update && <p>Sign up</p>}</button>
                            </form>
                        }
                        {registered &&
                            <div>
                                <div className="alert alert-success">Registration Successful</div>
                                <div className="form-input">
                                    <label className="form-check-label ">Customer ID</label>
                                    <p className="form-control">{customerid}</p>
                                </div>

                                <div className="form-input">
                                    <label className="form-check-label ">Customer ID</label>
                                    <p className="form-control">{accountNumber}</p>
                                </div>
                                <Link to="/" className="btn btn-primary">Back to Dashboard</Link>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>

    );


}

export default Form;