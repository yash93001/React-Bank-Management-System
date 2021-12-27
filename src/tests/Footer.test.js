import Footer from "../components/Footer";
import { shallow } from 'enzyme';
import { findByTestAttr } from '../testUtil';

const setup = (props = {}) => {
    return shallow(<Footer {...props}  />)
}

test("render without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-footer');
    expect(component.length).toBe(1);

})