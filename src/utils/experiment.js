export class Experiment {
    constructor(outcomes = [], events = {}) {
        this.totalOutcomes = outcomes;
        this.possibleEvents = events;
    }

setupDiceExperiment() {
    this.totalOutcomes = [1, 2, 3, 4, 5, 6];

    this.possibleEvents = {
        "Mayor que 4": x => x > 4,
        "Par": x => x % 2 === 0,
        "Igual a 3": x => x === 3,
    };
}

runExperiment(selectedEventName) {
    const randIndex = Math.floor(Math.random() * this.totalOutcomes.length);
    const result = this.totalOutcomes[randIndex];

    const func = this.possibleEvents[selectedEventName];
    const success = func ? func(result) : false;
    const possibleOutcomes = this.totalOutcomes.filter(x => func(x));

    return {
        event: selectedEventName,
        result: result,
        success: success,
        outcomes: possibleOutcomes
    };
}

estimateProbability(eventName) {
    const func = this.possibleEvents[eventName];
    if (!func) {
        console.warn(`Event "${eventName}" not found.`);
        return 0;
    }

    const favorable = this.totalOutcomes.filter(x => func(x)).length;
    return favorable / this.totalOutcomes.length;
}

classifyEvent(eventName) {
    const func = this.possibleEvents[eventName];
    if (!func) {
        console.warn(`Event "${eventName}" not found.`);
        return 0;
    }

    const favorable = this.totalOutcomes.filter(x => func(x)).length;

    if (favorable === 1){
        return "Simple";
    } else if (favorable === this.totalOutcomes.length){
        return "Seguro";
    } else if (favorable >= 1){
        return "Compuesto";
    } else {
        return "Imposible";
    }
}

}