// ------------ Exercise 1 -----------------------------------------------------------------

// params
const startValue = 1;
const endValue = 100;
let sourceData = [];

// data source generation
if (startValue > endValue) {
	for (let i = startValue; i >= endValue; i--){
		sourceData.push(i);
	}
} else {
	for (let i = startValue; i <= endValue; i++){
		sourceData.push(i);
	}
}


// helper functions
const isDivisibleBy3 = value => value % 3 === 0;
const isDivisibleBy5 = value => value % 5 === 0;
const isDivisibleBy3And5 = value => isDivisibleBy3(value) && isDivisibleBy5(value);
const getEvaluatedResult = value => {
	if (isDivisibleBy3And5(value)) return 'Visual Nuts';
	else if (isDivisibleBy3(value)) return 'Visual';
	else if (isDivisibleBy5(value)) return 'Nuts';
	
	return value;
};

// processing
sourceData = sourceData.map(currentValue => getEvaluatedResult(currentValue));

// output
console.log('Number evaluation result:');
console.log(sourceData);
