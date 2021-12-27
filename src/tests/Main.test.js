import Main, { UnconnectedMain } from "../components/Main";
import { shallow, mount } from 'enzyme';
import { storeFactory, findByTestAttr } from '../testUtil';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';


const helpers = require("../Actions/actions");



// return mount(<BrowserRouter><Main startLoadingUsers={startLoadingUsers()} {...props}  /></BrowserRouter>)


function Setup() {
    const store = storeFactory();
    return mount(
        <Provider store={store}>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </Provider>
    );


}
describe('guessWord action dispatcher', () => {
    beforeEach(() => {
        const addMock = jest.spyOn(helpers, "startLoadingUsers");

        addMock.mockImplementation(() => {
            return (dispatch) => {
                return dispatch(() => {
                    return dispatch(jest.fn())
                })

            }
        })


    });
    test('render without error', () => {

        const wrapper = Setup();
        const component = findByTestAttr(wrapper, 'component-Main');
        expect(component.length).toBe(1);
    })
    test('route checking', () => {
        const component = Setup();
        const pathMap = component.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});

    })

})
test('`startLoadingUsers` runs on Main mount', () => {
    const startLoadingUsers = jest.fn();
    const props = {
        startLoadingUsers: startLoadingUsers
    }
    const wrapper = shallow(<UnconnectedMain {...props} />);

    // run lifecycle method
    wrapper.instance().componentDidMount();

    // check to see if mock ran  
    expect(startLoadingUsers).toBeCalled();

});