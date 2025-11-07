import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Experiment } from "../utils/experiment";

export const  Probabilities = () => {
    const [experiment, setExperiment] = useState(null);
    const [result, setResults] = useState(null);

    useEffect(() => {
        document.title = "Probabilidades"
        const exp = new Experiment();
        exp.setupDiceExperiment();
        setExperiment(exp);
    }, []);


    const handleRun = (eventName) => {
        if (!experiment) return;
        const res = experiment.runExperiment(eventName);
        setResults(res);
    }

    return (
      <article className="probabilitiesPage">
      <h2>Experimento de dados 🎲</h2>
      <div className="buttons">
        <button onClick={() => handleRun("Mayor que 4")}>Mayor que 4</button>
        <button onClick={() => handleRun("Par")}>Par</button>
        <button onClick={() => handleRun("Igual a 3")}>Igual a 3</button>
      </div>

      {result && (
        <div className="result">
          <p>Evento: {result.event}</p>
          <p>Resultado del dado: {result.result}</p>
          <p>
            ¿Éxito?:{" "}
            <strong style={{ color: result.success ? "limegreen" : "tomato" }}>
              {result.success ? "Sí" : "No"}
            </strong>
          </p>
          <p>
            Probabilidad teórica:{" "}
            {experiment.estimateProbability(result.event).toFixed(2)}
          </p>
        </div>
      )}
    </article>
    );
}