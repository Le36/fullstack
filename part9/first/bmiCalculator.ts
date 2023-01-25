const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / height / height * 10000;

    if (bmi > 25) {
        return "overweight";
    } else if (bmi < 18.5) {
        return "underweight";
    } else {
        return "Normal (healthy weight)";
    }
}

console.log(calculateBmi(180, 74));