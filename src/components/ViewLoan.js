import { Link } from 'react-router-dom';

//This comoponent helps to view all the loans applied by the current logged in user.
const ViewLoan = (props) => {
    var backurl = `/Dashboard`;
    return (
        <div>
            <Link className="btn btn-primary inner mt-3" to={backurl}> BacK</Link>

            <div data-test="component-ViewLoan" className="d-flex justify-content-center">
                <div className="card mb-4 mt-5">
                    <div className="card-body  ">
                        <div className="table-responsive">
                            <table className="table table-bordered " id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th >Loan Type</th>
                                        <th>Duration Of Loan</th>
                                        <th>loanAmount</th>
                                        <th>Loan Apply Date</th>
                                        <th>Interest Rate</th>
                                        <th>Annual Income</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.currentUser.loanApplied.map((listValue, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index}</td>
                                                <td>{listValue.loanType}</td>
                                                <td>{listValue.durationOfLoan}</td>
                                                <td>{listValue.loanAmount}</td>
                                                <td>{listValue.loanApplyDate}</td>
                                                <td>{listValue.InterestRate}</td>
                                                <td>{listValue.annualIncome}</td>
                                                <td>
                                                    {listValue.LoanIssueDate &&
                                                        <div data-test="component-ViewLoan-approved">Approved </div>
                                                    }
                                                    {!listValue.LoanIssueDate &&
                                                        <div data-test="component-ViewLoan-peding"> Pending </div>
                                                    }
                                                </td>

                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewLoan