interface ExerciseInput {
    value1: number;
    value2: Array<number>;
}

interface ResultObject {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (target: number, data: Array<number>): ResultObject => {
    const results: ResultObject = {
        periodLength: 0,
        trainingDays: 0,
        success: false,
        rating: 0,
        ratingDescription: "",
        target: 0,
        average: 0
    };

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
};

const parseArgs = (args: Array<string>): ExerciseInput => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const exercises = [];

    if (isNaN(Number(args[2]))) {
        throw new Error('Provided values were not numbers!');
    } else {
        for (let i = 3; i < args.length; i++) {
            if (isNaN(Number(args[i]))) {
                throw new Error('Provided values were not numbers!');
            } else {
                exercises.push(Number(args[i]));
            }
        }
        return {
            value1: Number(args[2]),
            value2: exercises
        };
    }
};

try {
    const {value1, value2} = parseArgs(process.argv);
    console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}