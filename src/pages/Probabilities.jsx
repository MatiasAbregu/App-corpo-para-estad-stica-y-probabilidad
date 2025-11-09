import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Experiment } from "../utils/experiment";

export const  Probabilities = () => {
    const [experiment, setExperiment] = useState(null);
    const [result, setResults] = useState(null);
    const [outcomes, setOutcomes] = useState("");
    const [events, setEvents] = useState([]);


    useEffect(() => {
        document.title = "Probabilidades"
    }, []);

    const handleAddEvent = () => {
      setEvents([...events, {name: "", condition: ""}]);
    };

    const handleCreateExperiment = () => {
      const outcomesArr = outcomes.split(",").map(x => x.trim());

      const eventsObj = {};
      events.forEach(ev => {
        try {
          eventsObj[ev.name] = new Function("x", `return ${ev.condition}`);
        } catch{
          console.error("Error en condición:", ev.condition);
        }
      });

      setExperiment(new Experiment(outcomesArr, eventsObj));
    };

    const handleRun = (eventName) => {
        if (!experiment) return;
        const res = experiment.runExperiment(eventName);
        setResults(res);
    }

    const handleDeleteEvent = (i) =>{
      setEvents(events.filter((_,index) => index !== i));
    }

    return (
      <article>
        <h2>Simulador de experimentos</h2>

        <label>Espacio muestral (valores separados por coma):</label>
        <input 
          value={outcomes}
          onChange={(e) => setOutcomes(e.target.value)}
          placeholder="Ej: 1,2,3,4,5,6"
        />

        <h3>Eventos</h3>
        {events.length === 0 &&
        <p>No hay eventos (Presiona el botón agregar evento para crear uno)</p>
        }
        {events.length !== 0 &&
        <p>Presione el botón crear experimento una vez ingresados todos los eventos</p>
        }
        {events.map((ev, i) => (
          <div key={i}>
            <input 
              placeholder="Nombre del evento"
              value={ev.name}
              onChange={(e) => {
                const copy = [...events];
                copy[i].name = e.target.value;
                setEvents(copy);
              }}
            />
            <input 
              placeholder="Condición (ej:x > 4)"
              value={ev.condition}
              onChange={(e) => {
                const copy = [...events];
                copy[i].condition = e.target.value;
                setEvents(copy);
              }}
            />
            <button onClick={() => {handleDeleteEvent(i)}}>X</button>
          </div>
        ))}

        <button onClick={handleAddEvent}>Agregar evento</button>

        <button onClick={handleCreateExperiment}>Crear experimento</button>

        {experiment && (
          <>
            <h3>Ejecutar experimento</h3>
            {Object.keys(experiment.possibleEvents).map((evName) =>(
              <button key={evName} onClick={() => handleRun(evName)}>
                {evName}
              </button>
            ))}
          </>
        )}

        {result && (
          <div>
            <p>Resultado: {result.result}</p>
            <p>
              ¿Éxito?:{" "}
              <strong style={{color: result.success ? "limegreen" : "tomato"}}>
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