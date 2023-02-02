interface ResultObject {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (target: number, data: Array<number>): ResultObject => {
    let results: ResultObject = new class implements ResultObject {
        periodLength: number;
        trainingDays: number;
        success: boolean;
        rating: number;
        ratingDescription: string;
        target: number;
        average: number;
    }

    results.periodLength = data.length;
    results.trainingDays = data.filter(n => n != 0).length;
    const average = data.reduce((a, b) => a + b) / data.length;
    results.success = average >= target;

    if (average < 1) {
        results.rating = 1;
        results.ratingDescription = "bad";
    } else if (average > 3) {
        results.rating = 3;
        results.ratingDescription = "excellent";
    } else {
        results.rating = 2;
        results.ratingDescription = "decent";
    }

    results.target = target;
    results.average = average;

    return results;
}

console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));