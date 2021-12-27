import Welcome from "../components/Welcome";
import { shallow } from 'enzyme';
import { findByTestAttr } from '../testUtil';

const setup = (props = {}) => {
    return shallow(<Welcome {...props}  />)
}

test("render without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-welcome');
    expect(component.length).toBe(1);

})