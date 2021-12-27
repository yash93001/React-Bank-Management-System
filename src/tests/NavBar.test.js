import NavBar from "../components/NavBar";
import { shallow } from 'enzyme';
import { findByTestAttr } from '../testUtil';

const setup = (props = {}) => {
    return shallow(<NavBar {...props}  />)
}

test("render without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-NavBar');
    expect(component.length).toBe(1);

})