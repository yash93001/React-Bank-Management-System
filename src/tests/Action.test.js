import * as actions from "../Actions/actions";
import user from "../Data/user";


describe("testing fetch Operations", () => {
    beforeEach(() => {
        fetch.resetMocks();
    });
    it(" testing startLoadingUsers", async () => {
        fetch.mockResponseOnce([{}]);
        const users = await actions.startLoadingUsers();
        const call = await users();
        expect(fetch).toHaveBeenCalledTimes(1);

    });



    it(" testing startAddingUser", async () => {
        fetch.mockResponseOnce([{}]);
        const users = await actions.startAddingUser();
        const call = await users();
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it(" testing startAddingLoan", async () => {
        fetch.mockResponseOnce([{}]);
        const users = await actions.startAddingLoan();
        const call = await users();
        expect(fetch).toHaveBeenCalledTimes(1);
    });
})

test("testing loadUsers", () => {
    const action = actions.loadUsers();
    expect(action).toStrictEqual({
        type: 'LOAD_USERS',
        users: undefined,
    });
})
test("testing addUser", () => {
    const action = actions.addUser();
    expect(action).toStrictEqual({
        type: 'ADD_USER',
        user: undefined,
    });
})
test("testing addLoan", () => {
    const action = actions.addLoan();
    expect(action).toStrictEqual({
        type: 'ADD_LOAN',
        index: undefined,
        updatedUser: undefined
    });
})