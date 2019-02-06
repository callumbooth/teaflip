# Teaflip

A react component which tracks each member of yours teams drink consumption, allowing you to select 
who is in the next round, and it will randomly select a person to make it.

The component tracks the data locally and provides optimistic UI, it does not however implement
any way to persist the data. It does however return the winner and the people in each round when
a winner is chose to allow you to implement data persistence.

# How to use


## Install the component to your project

```
yarn add teaflip
```

or 

```
npm install teaflip
```

## Import the component

```javascript
import Teaflip from 'teaflip';
```

## Required props

The component expects a two props, "people" and "onWinner".


### People
An array of objects with the 4 following properties.

| Property | Type | Notes |
---| --- | --- |
| id | Int | Must be unique |
|name | String |
|cupsdrank | Int |
|roundsmade | Int |

```javascript
const data = [
    {
        id: 1,
        name: "John Smith",
        cupsdrank: 0,
        roundsmade: 0
    },
    ...
]
```

### onWinner
A function that returns the winner and the people in the round.

```javascript
handleWinner = (winner, round) {

}
```


## Example

```javascript

const handleWinner = (winner, round) {
    //winner is an object of the winner
    //round is an array of object for each person in the round with their updated values
}

const Component = () => {
    return (
        <>
            <h1>Teaflip</h1>
            <Teaflip people={data} onWinner={handleWinner} />
        </>
    )
}
```

## Todo

- [x] Add readme
- [ ] Expose the results of each round
