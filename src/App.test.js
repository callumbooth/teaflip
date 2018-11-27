import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { shallow } from "enzyme";

xit("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe("adding users to the round", () => {
    it("adds one user to the round", () => {
        const component = shallow(<App />);
        const instance = component.instance();
        expect(component.state("round")).toEqual([]);
        instance.addPersonToRound({ id: 1 });
        expect(component.state("round")).toEqual([1]);
    });
    it("adds two users to the round", () => {
        const component = shallow(<App />);
        const instance = component.instance();
        expect(component.state("round")).toEqual([]);
        instance.addPersonToRound({ id: 1 });
        expect(component.state("round")).toEqual([1]);
        instance.addPersonToRound({ id: 2 });
        expect(component.state("round")).toEqual([1, 2]);
    });
});

it("removes a user from the round", () => {
    const component = shallow(<App />);
    const instance = component.instance();
    component.setState({ round: [1, 2] });
    instance.removePersonFromRound({ id: 1 });
    expect(component.state("round")).toEqual([2]);
});

it("assigns correct value when round is offered", () => {
    const component = shallow(<App />);
    const instance = component.instance();

    const maker = {
        id: 1,
        name: "A Name",
        cupsdrank: 3,
        roundsmade: 2,
    };
    const otherPerson = {
        id: 2,
        name: "Person 2",
        cupsdrank: 4,
        roundsmade: 1,
    };
    const initialState = {
        round: [1, 2],
        people: [maker, otherPerson],
    };
    component.setState(initialState);
    instance.makeARound(maker);
    //Cups drank and rounds made goes up by 1 for the maker
    expect(component.state().people[0].cupsdrank).toEqual(4);
    expect(component.state().people[0].roundsmade).toEqual(3);

    //Every other person in round has cups drank increase by 1
    expect(component.state().people[1].cupsdrank).toEqual(5);
});

it("Everyone in round has cupsdrank increase by 1", () => {
    //We cant test for the winner because its random.
    const component = shallow(<App />);
    const instance = component.instance();

    const People = [
        {
            id: 3,
            name: "A Name",
            cupsdrank: 3,
            roundsmade: 2,
        },
        {
            id: 4,
            name: "Person 2",
            cupsdrank: 4,
            roundsmade: 1,
        },
    ];
    const initialState = {
        round: [3,4],
        people: People,
    };
    component.setState(initialState);
    instance.chooseTeaMaker();
    
    expect(component.state().people[0].cupsdrank).toEqual(4);
    expect(component.state().people[1].cupsdrank).toEqual(5);
});


it('changes the showModal state to false', () => {
    const component = shallow(<App />);
    const instance = component.instance();
    
    const initialState = {
        showModal: true
    };
    component.setState(initialState);
    instance.closeModal({
        preventDefault: () => {}
    });
    
    expect(component.state().showModal).toEqual(false);
});