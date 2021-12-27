import ViewLoan from "../components/ViewLoan";
import { shallow } from 'enzyme';
import { findByTestAttr } from '../testUtil';

const setup = (props = {}) => {
    return shallow(<ViewLoan {...props}  />)
}
const currentUser={
    CustomerId:"R-101",
    loanApplied : [
        
        {
          "loanType": "Housing",
          "expCurrentCompany": 3,
          "totalExp": 34,
          "designation": "rt",
          "companyName": "34",
          "annualIncome": 2,
          "durationOfLoan": "10",
          "loanApplyDate": "2021-10-08T18:30:00.000Z",
          "loanAmount": 65,
          "select": "10",
          "InterestRate": 7,
          "LoanIssueDate":"",
        },
        {
          "loanType": "Personal",
          "expCurrentCompany": 3,
          "totalExp": 4,
          "designation": "23",
          "companyName": "tre",
          "annualIncome": 3,
          "durationOfLoan": "10",
          "loanApplyDate": "2021-10-22T18:30:00.000Z",
          "loanAmount": 643,
          "select": "10",
          "InterestRate": 10,
          "LoanIssueDate": "2021-11-22T18:30:00.000Z"
        }
      ]
}
test("render without error", () => {
    const wrapper = setup({currentUser:currentUser});
    const component = findByTestAttr(wrapper, 'component-ViewLoan');
    expect(component.length).toBe(1);

})

