import Dashboard from "../components/Dashboard";
import { shallow } from 'enzyme';
import { findByTestAttr } from '../testUtil';

const setup = (props = {}) => {
    return shallow(<Dashboard {...props}  />)
}
const currentUser={
    FullName:'Yash',
    CustomerId:"R-101"
}
test("render without error", () => {
    const wrapper = setup({currentUser:currentUser});
    const component = findByTestAttr(wrapper, 'component-Dashboard');
    expect(component.length).toBe(1);

})