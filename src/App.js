import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// @flow

import data from './data.json';

class App extends Component {
    constructor() {
        super();
        this.state = {
            people: data.people,
            round: [],
            winner: null
        };
    }

    addPersonToRound(e, person) {
        if (this.state.round.find(o => o.id === person.id)) {
            return;
        }
        this.setState(prevState => ({
            round: [...prevState.round, person]
        }));
    }

    chooseTeaMaker = (e) => {
        if (this.state.round.length === 0) {
            return;
        }

        let updatedPeople = this.state.people.slice();

        let inRound = this.state.round.slice().sort((a,b) => {
            return a.roundsmade - b.roundsmade;
        });

        let winner;
        let lowest = inRound.find(o => o.cupsmade === inRound[0].cupsmade);
        if (inRound[0].id !== lowest.id) {
            winner = inRound[this.getRandomInt(inRound.length)];
        } else {
            winner = inRound[0];
        }
        
        updatedPeople.map(person => {
            if (inRound.find(p => p.id === person.id)) {
                person.cupsdrank++;
                if (person.id === winner.id) {
                    person.roundsmade++;
                    this.setState({
                        winner: person.name
                    });
                }
            }
            return person;
        });

        this.setState({
            people: updatedPeople
        });
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                </header>
                <div className="people">
                    {
                        this.state.winner ? <h2>And the winner is: {this.state.winner}</h2> : null
                    }
                    <h3>
                        People in round: 
                        {this.state.round.map((person, i) => {
                            return (
                                person.name + ', '
                            );
                        })}
                    </h3>
                    {this.state.people.map((person, i) => {
                        return (
                            <div key={i}>
                                Name: {person.name} <br />
                                Cups drank: {person.cupsdrank} <br />
                                Rounds Made: {person.roundsmade} <br />
                                <button onClick={(e) => this.addPersonToRound(e, person)}>
                                    Add to round
                                </button>
                            </div>
                        );
                    })}

                    <button onClick={this.chooseTeaMaker}>
                        Who's making the tea
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
