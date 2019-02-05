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

The component expects a single prop, "people".

It expects the value to an array of objects with the 4 following properties.
| Property | Type | Notes
---| --- | ---
| id | Int | Must be unique
|name | String
|cupsdrank | Int
|roundsmade | Int

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

## Example

```javascript
const Component = () => {
    return (
        <>
            <h1>Teaflip</h1>
            <Teaflip people={data} />
        </>
    )
}
```

## Todo

[x] Add readme
[ ] Expose the results of each round