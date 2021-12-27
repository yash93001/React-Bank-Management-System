import LoginSocial from "../components/LoginSocial";
import { shallow, mount } from 'enzyme';
import { findByTestAttr } from '../testUtil';
import { act } from "react-dom/test-utils";
const mockfunction2 = jest.fn(); 
jest.mock("@auth0/auth0-react", () => ({
    Auth0Provider: ({ children }) => '<div>{children}</div>',
    withAuthenticationRequired: ((component, _) => component),
    useAuth0: () => {
        return {
            isLoading: false,
            user: { email: "yash@gmail.com" },
            isAuthenticated: true,
            loginWithRedirect: jest.fn(),
            logout: mockfunction2
        }
    }
}))




const setup = (props = {}) => {
    return shallow(<LoginSocial {...props} />)
}

test("render without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-LoginSocial');
    const p = findByTestAttr(wrapper, 'component-LoginSocial')
    expect(component.length).toBe(1);
    expect(p.length).toBe(1);

})

describe("social Log in", () => {
    const mockFunction = jest.fn(() => { console.log("mock function Social") });

    const defaultUser = {
        users: [
            {
                CustomerId: "R-101",
                Email: "yash@gmail.com"
            },

        ],
        onLogin: mockFunction
    }
    beforeEach(() => {


    });

    test("testing login function", async () => {
        await act(async () => {
            const wrapper = shallow(<LoginSocial {...defaultUser} />);
            expect(mockFunction).toBeCalled();
    })
    });
    test("testing error field", () => {
        const wrapper = shallow(<LoginSocial {...defaultUser} />);
        const component = findByTestAttr(wrapper,"component-LoginSocial-bttn")
        expect(component.exists()).toBe(false);
        })
    
});