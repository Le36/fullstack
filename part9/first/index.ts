import express from "express";
import {calculateBmi} from "./bmiCalculator";
import {calculateExercises} from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);
    if (isNaN(weight) || isNaN(height) || !height || !weight) {
        res.send({error: "malformed parameters"});
    } else {
        res.send({
            weight: weight,
            height: height,
            bmi: calculateBmi(height, weight)
        });
    }
});

app.post('/exercises', (_req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = _req.body;
    if (!Array.isArray(daily_exercises)) {
        res.send({error: "malformed parameters"});
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    for (let i = 0; i < daily_exercises.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (isNaN(Number(daily_exercises[i]))) {
            res.send({error: "malformed parameters"});
        }
    }

    if (!daily_exercises || !target) {
        res.send({error: "parameters missing"});
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    } else if (isNaN(target)) {
        res.send({error: "malformed parameters"});
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = calculateExercises(target, daily_exercises);
        res.send(result);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});