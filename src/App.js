import React, { Component } from 'react';

import WinnerModal from './components/WinnerModal/index';
import './App.scss';

import data from './data.json';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: data.people,
            round: [],
            winner: null,
            showModal: false
        };
    }

    addPersonToRound(e, person) {
        if (this.state.round.find(o => o.id === person.id)) {
            return;
        }
        this.setState(prevState => ({
            round: [...prevState.round, person.id]
        }));
    }

    chooseTeaMaker = (e) => {
        if (this.state.round.length === 0) {
            return;
        }

        let updatedPeople = this.state.people.slice();
        let theRound = this.state.round.slice();

        updatedPeople.map(person => {
            if (theRound.indexOf(person.id) === -1) {
                return person;
            }

            let weight = person.cupsdrank - person.roundsmade;
            
            if (weight > 1) {
                for(let i = 0; i < weight; i++) {
                    theRound.push(person.id);
                }
            }
        });
        const winner = theRound[this.getRandomInt(theRound.length)];

        updatedPeople.map(person => {
            if (theRound.indexOf(person.id) === -1) {
                return person;
            }
            person.cupsdrank++;
            if (person.id === winner) {
                person.roundsmade++;
                this.setState({
                    winner: person
                });
            }

            return person;
        });

        this.setState({
            people: updatedPeople,
            round: [],
            showModal: true
        }, () => {
            if (typeof(this.props.onChosen) === "function") {
                this.props.onChosen(this.state.people);
            }
        });   
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    closeModal = (e) => {
        e.preventDefault();

        this.setState({
            showModal: false
        });
    }

    render() {
        return (
            <div className="tf-app">
                <div className="tf-header">
                    <h3>
                        Who's In the round: 
                        {this.state.people.map((person, i) => {
                            if (this.state.round.indexOf(person.id) !== -1) {
                                return (
                                    person.name + ', '
                                );
                            } else {
                                return '';
                            }
                        })}
                    </h3>
                    <button className="tf-btn" onClick={this.chooseTeaMaker}>
                        Find the winner
                    </button>
                </div>
                
                <div className="people">
                    {this.state.people.map((person, i) => {
                        return (
                            <div className="person" key={i}>
                                Name: {person.name} <br />
                                Cups drank: {person.cupsdrank} <br />
                                Rounds Made: {person.roundsmade} <br />
                                <button className="tf-btn" onClick={(e) => this.addPersonToRound(e, person)}>
                                    Add to round
                                </button>
                            </div>
                        );
                    })}
                </div>
                <WinnerModal closeModal={this.closeModal} open={this.state.showModal}>{this.state.winner ? this.state.winner.name : null}</WinnerModal>
            </div>
        );
    }
}

export default App;
