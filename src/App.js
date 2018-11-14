import React, { Component } from 'react';

import WinnerModal from './components/WinnerModal/index';
import './App.scss';

import data from './data.json';

import { ReactComponent as CoffeeIcon } from './icons/coffee-solid.svg';
import { ReactComponent as TeaPot } from './icons/teapot.svg';

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
        if (this.state.round.indexOf(person.id) !== -1) {
            return;
        }
        this.setState(prevState => ({
            round: [...prevState.round, person.id]
        }));
    }

    removePersonFromRound(e, person) {
        if (this.state.round.indexOf(person.id) === -1) {
            return;
        }
        this.setState(prevState => ({
            round: prevState.round.filter((id, i) => {
                return id !== person.id
            })
        }));
    }

    makeARound(e, maker) {
        let updatedPeople = this.state.people.slice();
        let theRound = this.state.round.slice();

        updatedPeople.map(person => {
            if (theRound.indexOf(person.id) === -1) {
                return person;
            }
            person.cupsdrank++;
            if (maker.id === person.id) {
                person.roundsmade++;
            }

            return person;
        });

        this.setState({
            people: updatedPeople,
            round: []
        }, () => {
            if (typeof(this.props.onChosen) === "function") {
                this.props.onChosen(this.state.people);
            }
        });
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
            
            if (weight > 0) {
                for(let i = 1; i < weight; i++) {
                    theRound.push(person.id);
                }
            }
            return updatedPeople;
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

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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
                        let name = person.name.split(" ");
                        let image
                        if (person.image) {
                            image = person.image;
                        } else {
                            image = (<div>
                                {name.map((word, i) => {
                                    if (i < 2) {
                                        return word.substring(0,1);
                                    }
                                    return '';
                                })}
                            </div>);
                        }
                        return (
                            <div className="person" key={i}>
                                <div className="person-wrapper">
                                    <div className="profile-image" style={{"backgroundColor": this.getRandomColor()}}>
                                        {image}
                                    </div>
                                    <div className="profile-info">
                                        <div className="name"><h3>{person.name}</h3></div>
                                        <div className="cups-info">
                                            <div className="drank">
                                                <CoffeeIcon style={{"width": "12px"}}/> {person.cupsdrank} <br />
                                            </div>        
                                            <div className="made">
                                                <TeaPot style={{"width": "12px"}}/> {person.roundsmade} <br />
                                            </div>
                                        </div>
                                        <div style={{"flex": "0 0 100%"}}>
                                            <button className="tf-btn" onClick={(e) => this.addPersonToRound(e, person)}>
                                                Add to round
                                            </button>
                                        </div>
                                        {this.state.round.indexOf(person.id) !== -1 ? 
                                            (
                                                <div style={{"display": "block"}}>
                                                    <button className="tf-btn" onClick={(e) => this.makeARound(e, person)}>
                                                        Make the round
                                                    </button>
                                                    <button className="tf-btn" onClick={(e) => this.removePersonFromRound(e, person)}>
                                                        delete from round
                                                    </button>
                                                </div>
                                            )
                                        : null}
                                    </div>
                                </div>
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
