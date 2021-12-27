import Form from '../components/Form';
import { findByTestAttr } from '../testUtil';
import { shallow, mount } from 'enzyme';
import wait from "waait";
import { act } from 'react-dom/test-utils';


const setup = (props = {}) => {
    const setupProps = { ...props };
    return shallow(<Form />)
};

describe("render without error", () => {
    test('when updated is true', () => {
        const wrapper = setup({ update: true });
        const component = findByTestAttr(wrapper, 'component-forms');
        expect(component.length).toBe(1);
    });


    test('when updated is false', () => {
        const wrapper = setup({ update: false });
        const component = findByTestAttr(wrapper, 'component-forms');
        expect(component.length).toBe(1);
    });

})


describe("Testing Form Validations", () => {
    let ui;
    beforeEach(() => {
        ui = mount(<Form />);

    });

    test("Wrong Full Name Value", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-FullName");
            Field.simulate("change", {
                target: {
                    name: "FullName",
                    value: "s1"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-FullName-error");
            expect(errors.text().trim()).not.toBe("");
        })
    });

    test("Correct Full Name Value", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-FullName");
            Field.simulate("change", {
                target: {
                    name: "FullName",
                    value: "yash"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-FullName-error");
            expect(errors.text().trim()).toBe("");
        })
    });

    test("InCorrect UserName Value", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-UserName");
            Field.simulate("change", {
                target: {
                    name: "Username",
                    value: ""
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-UserName-error");
            expect(errors.text().trim()).not.toBe("");
        })
    });

    test("Incorrect Password Value (Capital Letter not found)", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-Password");
            Field.simulate("change", {
                target: {
                    name: "Password",
                    value: "yash123@"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-Password-error");
            expect(errors.text().trim()).not.toBe("");
        })
    });

    test("Incorrect Password Value(Special Symbol Not found)", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-Password");
            Field.simulate("change", {
                target: {
                    name: "Password",
                    value: "Yash123"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-Password-error");
            expect(errors.text().trim()).not.toBe("");
        })
    });

    test("Incorrect Password Value(Numbers Not found)", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-Password");
            Field.simulate("change", {
                target: {
                    name: "Password",
                    value: "Yash@"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-Password-error");
            expect(errors.text().trim()).not.toBe("");
        })
    });

    test("Correct Password Value", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-Password");
            Field.simulate("change", {
                target: {
                    name: "Password",
                    value: "Yash123@"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-Password-error");
            expect(errors.text().trim()).toBe("");
        })
    });

    test("Gaurdian Type Field is empty", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-GaudianType");
            Field.simulate("change", {
                target: {
                    name: "Guardian_Type",
                    value: ""
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-GaudianType-error");
            expect(errors.text().trim()).not.toBe("");
        })
    });

    test("Gaurdian Type Field is not empty", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-GaudianType");
            Field.simulate("change", {
                target: {
                    name: "Guardian_Type",
                    value: "Parent"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-GaudianType-error");
            expect(errors.text().trim()).toBe("");
        })
    });

    test("Gaurdian Name Field is empty", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-GaudianName");
            Field.simulate("change", {
                target: {
                    name: "Guardian_Name",
                    value: ""
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-GaudianName-error");
            expect(errors.text().trim()).not.toBe("");
        })
    });

    test("Citizienship Field is Not Empty", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-Citizienship");
            Field.simulate("change", {
                target: {
                    name: "Citizienship",
                    value: "Permanent"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-Citizienship-error");
            expect(errors.text().trim()).toBe("");
        })
    });

    test("Citizienship Field is Not Empty", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-Citizienship");
            Field.simulate("change", {
                target: {
                    name: "Citizienship",
                    value: "Permanent"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-Citizienship-error");
            expect(errors.text().trim()).toBe("");
        })
    });

    test("Email Field is empty", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-Email");
            Field.simulate("change", {
                target: {
                    name: "Email",
                    value: ""
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-Email-error");
            expect(errors.text().trim()).not.toBe("");
        })
    });

    test("Address Field is empty", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-Address");
            Field.simulate("change", {
                target: {
                    name: "Address",
                    value: ""
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-Address-error");
            expect(errors.text().trim()).not.toBe("");
        })
    });

    test("Gender Field is not empty", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-Gender");
            Field.simulate("change", {
                target: {
                    name: "Gender",
                    value: "Male"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-Gender-error");
            expect(errors.text().trim()).toBe("");
        })
    });
    
    test("MaritalStatus Field is not empty", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui, "component-form-MaritalStatus");
            Field.simulate("change", {
                target: {
                    name: "MaritalStatus",
                    value: "Single"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-MaritalStatus-error");
            expect(errors.text().trim()).toBe("");
        })
    });
    test("Contact Number must be only digits", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui,"component-form-ContactNumber");
            Field.simulate("change", {
                target: {
                    name: "ContactNumber",
                    value: "dwe23432444"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-ContactNumber-error");
            expect(errors.text().trim()).not.toBe("");
        })
    });
    test("Contact Number must have 10 digits", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui,"component-form-ContactNumber");
            Field.simulate("change", {
                target: {
                    name: "ContactNumber",
                    value: "123212"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-ContactNumber-error");
            expect(errors.text().trim()).not.toBe("");
        })
    });

    test("Proper Dob is entered", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui,"component-form-dob");
            Field.simulate("change", {
                target: {
                    name: "dob",
                    value: "2000-01-06"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-dob-error");
            //testing for error message
            expect(errors.text().trim()).toBe("");
            const age = findByTestAttr(ui, "component-form-Age");
            //testing for age input field
            expect(age.props().value).toBe(21);
            const citizenStatus = findByTestAttr(ui, "component-form-CitizenStatus");
            //testing for citizen status input field
            expect(citizenStatus.props().value.trim()).toBe('Normal');
            
        })
    });

    test("Invalid Dob is entered", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui,"component-form-dob");
            Field.simulate("change", {
                target: {
                    name: "dob",
                    value: "2021-01-06"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-dob-error");
            //testing for error message
            expect(errors.text().trim()).not.toBe("");
            const age = findByTestAttr(ui, "component-form-Age");
            //testing for age input field
            expect(age.props().value).toBe(0);
            const citizenStatus = findByTestAttr(ui, "component-form-CitizenStatus");
            //testing for citizen status input field
            expect(citizenStatus.props().value.trim()).toBe('Minor');
            
        })
    });
    test("Invalid Dob is entered", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui,"component-form-dob");
            Field.simulate("change", {
                target: {
                    name: "dob",
                    value: "1890-01-06"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-dob-error");
            //testing for error message
            expect(errors.text().trim()).not.toBe("");
            const age = findByTestAttr(ui, "component-form-Age");
            //testing for age input field
            expect(age.props().value).toBe(131);
            const citizenStatus = findByTestAttr(ui, "component-form-CitizenStatus");
            //testing for citizen status input field
            expect(citizenStatus.props().value.trim()).toBe('Senior');
            
        })
    });
    test("Account Type -saving", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui,"component-form-dob-accountType");
            Field.simulate("change", {
                target: {
                    name: "accountType",
                    value: "Saving"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-dob-accountType-error");
            expect(errors.text().trim()).toBe("");

            const initialAmount = findByTestAttr(ui, "component-form-initialAmount");
            
            expect(initialAmount.props().value).toBe(5000);
            
        })
    });
    test("Account Type - Salary", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui,"component-form-dob-accountType");
            Field.simulate("change", {
                target: {
                    name: "accountType",
                    value: "Salary"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-dob-accountType-error");
            expect(errors.text().trim()).toBe("");

            const initialAmount = findByTestAttr(ui, "component-form-initialAmount");
            
            expect(initialAmount.props().value).toBe(0);
            
        })
    });
    
    test("Branch Field is empty", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui,"component-form-branchName");
            Field.simulate("change", {
                target: {
                    name: "branchName",
                    value: ""
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-branchName-error");
            expect(errors.text().trim()).not.toBe("");


        })
    });

    test("Identification Proof Field value check", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui,"component-form-identificationProofType");
            Field.simulate("change", {
                target: {
                    name: "identificationProofType",
                    value: "PAN"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-identificationProofType-error");
            expect(errors.text().trim()).toBe("");
            
            const docNumber = findByTestAttr(ui, "component-form-docNumber");
            expect(docNumber.props().disabled).toBe(false);

        })
    });
    
        
    test("refAccountHolderAddr is empty", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui,"component-form-refAccountHolderAddr");
            Field.simulate("change", {
                target: {
                    name: "refAccountHolderAddr",
                    value: ""
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-refAccountHolderAddr-error");
            expect(errors.text().trim()).not.toBe("");


        })
    });

    test("refAccountHolderName is empty", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui,"component-form-refAccountHolderName");
            Field.simulate("change", {
                target: {
                    name: "refAccountHolderName",
                    value: ""
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-refAccountHolderName-error");
            expect(errors.text().trim()).not.toBe("");


        })
    });
    test("refAccountHolderAccNo should not be empty and should have 16 digits", async () => {
        await act(async () => {
            const Field = findByTestAttr(ui,"component-form-refAccountHolderAccNo");
            Field.simulate("change", {
                target: {
                    name: "refAccountHolderAccNo",
                    value: "345543"
                }
            });
            Field.simulate("blur");
            await wait(0);
            ui.update();
            const errors = findByTestAttr(ui, "component-form-refAccountHolderAccNo-error");
            expect(errors.text().trim()).not.toBe("");


        })
    });
   
    
});

describe('Form Submit', () => {
    let wrapper;

    beforeEach(() => {

        wrapper = shallow(<Form></Form>);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('check submit', async () => {
        await act(async () => {
            expect(wrapper.find('form')).toHaveLength(1);
            const formEventMocked = { preventDefault: jest.fn() };

            wrapper.find('form').simulate('submit', formEventMocked);
            expect(formEventMocked.preventDefault).toBeCalledTimes(1);
        })
    });
    
});




