import express from "express";
import {calculateBmi} from "./bmiCalculator";


const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});