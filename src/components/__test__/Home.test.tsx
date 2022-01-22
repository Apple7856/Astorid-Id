import {Home} from "../Home";
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe("Home Component", () => {

    afterEach(() => {
        cleanup();
    })

    test("Home Component", async () => {
        const { getByTestId } = render(<Home />);
        const mainComponent = getByTestId("mainComponent");
        expect(mainComponent).toBeTruthy();
    })

    test("Input TextField", async () => {
        await act(async () => {
            const { getByTestId } = render(<Home />);
            const inputField = getByTestId("inputField");
            expect(inputField).toBeTruthy();
        })
    })

    test("Button Test", () => {
        const home = render(<Home />);
        const buttonTest = home.getByTestId("buttonTest");
        expect(buttonTest).toBeTruthy();
    })

    test("Button Test", () => {
        const home = render(<Home />);
        const randomButtonTest = home.getByTestId("randomButtonTest");
        expect(randomButtonTest).toBeTruthy();
    })
    

    test("Matches SnapShot", () => {
        const tree = renderer.create(<Home />).toJSON();
        expect(tree).toMatchSnapshot();
    })

})
