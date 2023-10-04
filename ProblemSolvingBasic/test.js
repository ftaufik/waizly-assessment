// Soal 1
function miniMaxSum(arr) {
    let max = arr[0];
    let min = arr[0];
    let sum = 0;
    
    for(let i = 0; i < arr.length; i++){
        if(arr[i] > max){
            max = arr[i];
        }
        if(arr[i] < min){
            min = arr[i];
        }
        sum += arr[i];
    }
    
    let minSum = sum - max;
    let maxSum = sum - min;
    
    console.log(minSum, maxSum);
}

const arrayInput = [1, 3, 5, 7, 9];
console.log('-----miniMaxSum-----');
miniMaxSum(arrayInput);



// Soal 2
function plusMinus(arr) {
    let positives = 0;
    let negatives = 0;
    let zeros = 0;
    
    for(let i = 0; i < arr.length; i++){
        if (arr[i] > 0) {
            positives += 1;
        } 
        else if (arr[i] < 0) {
            negatives += 1;
        } 
        else {
            zeros += 1;
        }
    }
        const resultPositives = parseFloat(positives / arr.length).toFixed(arr.length);
        const resultNegatives = parseFloat(negatives / arr.length).toFixed(arr.length);
        const resultZeros = parseFloat(zeros / arr.length).toFixed(arr.length);
        
        console.log(resultPositives);
        console.log(resultNegatives);
        console.log(resultZeros);
}

const arrayInput2 = [-4, 3, -9, 0, 4, 1];
console.log("-----plusMinus-----");
plusMinus(arrayInput2);



// Soal 3
function timeConversion(s) {
    let amPm = s.charAt(8);
    let militaryTime = "";
    
    if (amPm == "A") {
        if (s.substring(0,2) == "12"){
            militaryTime = "00"
        }
        else {
            militaryTime = s.substring(0,2);
        }
    }
    else {
        if (s.substring(0,2) == "12") {
            militaryTime = s.substring(0,2);
        }
        else {
            militaryTime = parseInt(s.substring(0,2), 10) + 12;
        }
    }
    
    console.log(militaryTime + s.substring(2,8));
}

const timeInput = "12:01:00PM";
const timeInput2 = "12:01:00AM";
console.log("-----timeConversion-----");
timeConversion(timeInput);
timeConversion(timeInput2);
