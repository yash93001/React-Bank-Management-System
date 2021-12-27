import ApplyLoan from "../components/ApplyLoan";
import { findByTestAttr } from '../testUtil';
import {  mount } from 'enzyme';
import wait from "waait";
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom'

const method = ApplyLoan.onSubmitHandler
jest.mock("react-hook-form", () => ({
    ...jest.requireActual("react-hook-form"),
  handleSubmit: jest.fn()
}))
const setup = (props = {}) => {
    return mount(<BrowserRouter><ApplyLoan currentUser={currentUser} /></BrowserRouter>)
}

const currentUser = {
    FullName: 'Yash',
    CustomerId: "R-101"
}

test("render without error", () => {
    const wrapper = setup({ currentUser: currentUser });
    const component = findByTestAttr(wrapper, 'component-ApplyLoan');
    expect(component.length).toBe(1);

})

describe("Testing ApplyLoan Form Validations for Common Fields", () => {
    let ui;
    beforeEach(() => {
        ui = setup({ currentUser: currentUser });

    });

    test("Loan Type Field is Education", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-ApplyLoan-loanType");
            Field.simulate("change", {
                target: {
                    name: "loanType",
                    value: "Education"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-ApplyLoan-loanType-error");
            expect(errors.text().trim()).toBe("");
            const interestRate = findByTestAttr(ui, "component-ApplyLoan-InterestRate");
            expect(interestRate.props().value).toBe(5);
        })
    })
    test("Loan Type Field is Personal", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-ApplyLoan-loanType");
            Field.simulate("change", {
                target: {
                    name: "loanType",
                    value: "Personal"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-ApplyLoan-loanType-error");
            expect(errors.text().trim()).toBe("");
            const interestRate = findByTestAttr(ui, "component-ApplyLoan-InterestRate");
            expect(interestRate.props().value).toBe(10);
        })
    })
    test("Loan Type Field is Housing", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-ApplyLoan-loanType");
            Field.simulate("change", {
                target: {
                    name: "loanType",
                    value: "Housing"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-ApplyLoan-loanType-error");
            expect(errors.text().trim()).toBe("");
            const interestRate = findByTestAttr(ui, "component-ApplyLoan-InterestRate");
            expect(interestRate.props().value).toBe(7);
        })
    })
    test("Invalid Loan Amount", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-loanAmount");
            Field.simulate("change", {
                target: {
                    name: "loanAmount",
                    value: "ads"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-loanAmount-error");
            expect(errors.text().trim()).not.toBe("");

        })
    })
    test("Minimum Loan Amount", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-loanAmount");
            Field.simulate("change", {
                target: {
                    name: "loanAmount",
                    value: "0"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-loanAmount-error");
            expect(errors.text().trim()).not.toBe("");

        })
    })
    test("No Loan Apply Date", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-loanApplyDate");
            Field.simulate("change", {
                target: {
                    name: "loanApplyDate",
                    value: ""
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-loanApplyDate-error");
            expect(errors.text().trim()).not.toBe("");

        })
    })
    test("Loan Apply Date is less than today's date", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-loanApplyDate");
            Field.simulate("change", {
                target: {
                    name: "loanApplyDate",
                    value: "2010-10-08T18:30:00.000Z"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-loanApplyDate-error");
            expect(errors.text().trim()).not.toBe("");

        })
    })
    test("Loan Type Field is empty", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-durationOfLoan");
            Field.simulate("change", {
                target: {
                    name: "durationOfLoan",
                    value: ""
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-durationOfLoan-error");
            expect(errors.text().trim()).toBe("");

        })
    })
    test("Loan Type Field is empty", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-durationOfLoan");
            Field.simulate("change", {
                target: {
                    name: "durationOfLoan",
                    value: ""
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-durationOfLoan-error");
            expect(errors.text().trim()).toBe("");

        })
    })

})

describe("Testing ApplyLoan Form Education type loan", () => {
    let ui;
    beforeEach(async () => {
        await act(async () => {
            ui = setup({ currentUser: currentUser });
            const Field = findByTestAttr(ui, "component-ApplyLoan-loanType");
            Field.simulate("change", {
                target: {
                    name: "loanType",
                    value: "Education"
                }
            });
            Field.simulate("blur");
        })
    });

    test("Loan Type Field is empty", async () => {
        await act(async () => {
            await wait(0);
            ui.update();
            let component = findByTestAttr(ui, "component-courseFee");
            expect(component.exists()).toBe(true);
            let errors = findByTestAttr(ui, "component-courseFee-error");
            expect(errors.text().trim()).toBe("");

            component = findByTestAttr(ui, "component-course");
            expect(component.exists()).toBe(true);
            errors = findByTestAttr(ui, "component-course-error");
            expect(errors.text().trim()).toBe("");


        })
    })
    test("Loan Type Field is empty", async () => {
        await act(async () => {
            await wait(0);
            ui.update();
            let component = findByTestAttr(ui, "component-fatherName");
            expect(component.exists()).toBe(true);
            let errors = findByTestAttr(ui, "component-fatherName-error");
            expect(errors.text().trim()).toBe("");


        })
    })

})
const mockData = {}
test("render without error", async () => {
    await act(async () => {
    const wrapper = setup({ currentUser: currentUser });
    const component = findByTestAttr(wrapper, 'component-ApplyLoan-form');
    expect(component.length).toBe(1);
    component.simulate('submit');
    })
})