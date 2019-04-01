let arr = [1, 2, 3, 4];


/**
 * Reduce function.
 */
Array.prototype.reduce = function (...args) {
    let func = args[1];
    let array = args[0];
    let temp = 0;
    array.forEach(element => {
        temp = func.apply(this, [temp, element]);
    });
    if (args.length > 2) {
        return (temp + args[2]);
    } else {
        return temp;
    }
}

let reducer = (accumulator, currentValue) => {
    return (accumulator + currentValue)
}
console.log('reduce function result:')
console.log(arr.reduce(arr, reducer));
console.log(arr.reduce(arr, reducer, 15));


/**
 * MAP function.
 */

Array.prototype.map = function (arr, func) {
    let tempArr = [];
    for (let i = 0; i < arr.length; i++) {
        let result = func(arr[i]);
        tempArr.push(result);
    }
    return tempArr;
}
console.log('Map function result:')
arr.map(arr, (x) => {
    console.log(x);
});


/**
 * Filter function.
 */

Array.prototype.filter = function (arr, predicate) {
    let tempArr = [];
    for (let i = 0; i < arr.length; i++) {
        let result = predicate.call(this, arr[i]);
        if (result) {
            tempArr.push(arr[i]);
        }
    }
    return tempArr;
}

// predicate function.
isEven = (val) => {
    return (val > 1)
}
console.log('filter function result:')
console.log(arr.filter(arr, isEven));



/**
 * Bind using call and apply.
 */



Function.prototype.myBind = function (func, args) {
    let self = this;
    return function () {
        return self.apply(func, [args]);
    }
}

var module = {
    x: 42,
    getX: function () {
        return this.x;
    }
}
var unboundGetX = module.getX;
var boundGetX = unboundGetX.myBind(module);
console.log('bind function results:');
console.log(boundGetX());


/**
 * Call function
 */


Function.prototype.myOwnCall = function (reference, ...args) {
    var self = this;
    self.bind(reference, args[0], args[1])();
}

function Product(name, price) {
    this.name = name;
    this.price = price;
}

function Food(name, price) {
    Product.myOwnCall(this, name, price);
    this.category = 'food';
}
console.log('call function result:');
console.log(new Food('cheese', 5).name);


/**
 * Apply function .
 */


Function.prototype.myOwnApply = function (reference, args) {
    var self = this;
    console.log(self);
    self.call(reference, ...args)
}

var fullName = function (city, country) {
    this.city = city;
    this.country = country;
}
person1 = function (city, country) {
    this.firstName = "Mary";
    this.lastName = "Doe"
    fullName.myOwnApply(this, [city, country]);
};
console.log(new person1('oslo', 'norway').country);