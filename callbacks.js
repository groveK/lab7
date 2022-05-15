let animals = ['Giraffe', 'Elephant', 'Yak']

animals.forEach( function(animal) {
    console.log(animal)
})

animals.forEach( (animal, index) => {console.log(animal, index)})
    //arrow function notation

animals.forEach((animal) => console.log(animal))
    //no curly braces if only 1 argument

