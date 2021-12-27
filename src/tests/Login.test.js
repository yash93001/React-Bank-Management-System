import Login from '../components/Login.tsx';
import { findByTestAttr } from '../testUtil';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
const mockfunction2 = jest.fn()
jest.mock("@auth0/auth0-react", () => ({
    Auth0Provider: ({ children }) => '<div>{children}</div>',
    withAuthenticationRequired: ((component, _) => component),
    useAuth0: () => {
        return {
            isLoading: false,
            user: { sub: "foobar" },
            isAuthenticated: true,
            loginWithRedirect: mockfunction2
        }
    }
}))
const defaultUser = [
    {
        CustomerId: "R-101",
        Password: "Yashh"
    },
]


const setup = (props = {}) => {
    return shallow(<Login {...props} />)
}

test("render without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-login');
    expect(component.length).toBe(1);

})

describe("Form Submission", () => {
    let wrapper;
    const mockFunction = jest.fn(() => { console.log("mock function") });
    beforeEach(() => {
        wrapper = setup({ users: defaultUser, onLogin: mockFunction });
    });
    test('test with incorrect customer-Id', () => {
        const fakeEvent = { target: { CustomerID: { value: "das" }, password: { value: "d" } }, preventDefault: () => console.log('preventDefault') };
        const submit = findByTestAttr(wrapper, "component-login-form")
        expect(submit.length).toBe(1);
        submit.simulate("submit", fakeEvent)
        const error = findByTestAttr(wrapper, "component-login-CustomerID-error")
        expect(error.text().trim()).not.toBe("");

    });
    test('test with incorrect password', () => {
        const fakeEvent = { target: { CustomerID: { value: "R-101" }, password: { value: "vv" } }, preventDefault: () => console.log('preventDefault') };
        const submit = findByTestAttr(wrapper, "component-login-form")
        expect(submit.length).toBe(1);
        submit.simulate("submit", fakeEvent)
        const error = findByTestAttr(wrapper, "component-login-CustomerID-error")
        expect(error.text().trim()).toBe("");
        const passError = findByTestAttr(wrapper, "component-login-password-error");
        expect(passError.text().trim()).not.toBe("");
    });
    test('test with correct customerID and password', () => {
        const fakeEvent = { target: { CustomerID: { value: "R-101" }, password: { value: "Yashh" } }, preventDefault: () => console.log('preventDefault') };
        const submit = findByTestAttr(wrapper, "component-login-form")
        expect(submit.length).toBe(1);
        submit.simulate("submit", fakeEvent)
        const error = findByTestAttr(wrapper, "component-login-CustomerID-error")
        expect(error.text().trim()).toBe("");
        const passError = findByTestAttr(wrapper, "component-login-password-error");
        expect(passError.text().trim()).toBe("");
        expect(mockFunction).toHaveBeenCalled();
    });



})



describe("Google Log in", () => {

    it("Testing logging with google ", async () => {
        await act(async () => {
            const wrapper = mount(<Login />)
            wrapper.find(`[data-test="component-login-submit"]`).simulate("click");
            expect(mockfunction2).toBeCalled();
        })
    });

});
