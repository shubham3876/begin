function SortArray(values) {
  this.originalArray = values,
  this.getSortedArray = function() {
    return this.sortArray();
  }
  this.sortArray = function() {
    return this.originalArray.sort(this.compare);
  }
  this.compare = function(a, b) {
    return a - b;
  }
}

var numberArray = new SortArray([7, 11, 2, 19, 12, 3, 6]);
console.log(numberArray.getSortedArray());

function SortObjectArray(objectValues) {
  SortArray.call(this, objectValues);
  // sorting student objects on basis of marks
  this.compare = function(a, b) {
    if (a.marks < b.marks) {
      return 1;
    }
    if (a.marks > b.marks) {
      return -1;
    }
    return 0;
  }
}

SortObjectArray.prototype = Object.create(SortArray.prototype);
SortObjectArray.prototype.constructor = SortObjectArray;

var students = new SortObjectArray(
  [{
    marks: 50,
    name: 'x'
  },
  {
    marks: 100,
    name: 'a'
  },
  {
    marks: 30,
    name: 'a'
  },
  {
    marks:50,
    name: 'c'
  },
  {
    marks: 80,
    name: 'a'
  },
  {
    marks: 100,
    name: 'z'
  }]
);

console.log(students.getSortedArray());
