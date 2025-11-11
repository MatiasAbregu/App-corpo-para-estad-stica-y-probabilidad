import React, { useEffect, useState } from "react";
import { BackButton } from '../components/BackButton'
import { Experiment } from "../utils/experiment";
import '../styles/Probabilities.css'

export const  Probabilities = () => {
    const [experiment, setExperiment] = useState(null);
    const [result, setResults] = useState(null);
    const [outcomes, setOutcomes] = useState("");
    const [events, setEvents] = useState([]);


    useEffect(() => {
        document.title = "Probabilidades"
    }, []);

    const handleAddEvent = () => {
      setEvents([...events, {name: "", operator: ">", condition: ""}]);
    };

    const handleCreateExperiment = () => {
      const outcomesArr = outcomes.split(",").map(x => x.trim());

      const eventsObj = {};

      events.forEach(ev => {
        if (!ev.name || ev.value === undefined || !ev.operator) return;

        try {
          const val = isNaN(ev.value) ? ev.value : Number(ev.value);

          eventsObj[ev.name] = (x) => {
            const numX = isNaN(x) ? x : Number(x);
            switch (ev.operator) {
              case ">": return numX > val;
              case "<": return numX < val;
              case "==": return numX == val;
              case ">=": return numX >= val;
              case "<=": return numX <= val;
              default: return false;
            }
          };
        } catch (e) {
          console.error("Error al crear evento:", ev.e)
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
      <article className="probabilitiesPage">
        <BackButton url={"/"} />
        <h2>Simulador de experimentos</h2>

        <label>Espacio muestral (valores separados por coma):</label>
        <input 
          className="outcomesInput"
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
          <div key={i} className="eventRow">
            <input 
              className="eventName"
              placeholder="Nombre del evento"
              value={ev.name}
              onChange={(e) => {
                const copy = [...events];
                copy[i].name = e.target.value;
                setEvents(copy);
              }}
            />
            <div className="eventValue">
            <span>x</span>
            <select
              value={ev.operator || ">"}
              onChange={(e) => {
                const copy = [...events];
                copy[i].operator = e.target.value;
                setEvents(copy);
              }}
            >
              <option value=">">{">"}</option>
              <option value="<">{"<"}</option>
              <option value="==">{"="}</option>
              <option value=">=">{">="}</option>
              <option value="<=">{"<="}</option>
            </select>

            <input 
              className="probInput"
              placeholder="Valor"
              value={ev.value ?? ""}
              onChange={(e) => {
                const copy = [...events];
                copy[i].value = e.target.value;
                setEvents(copy);
              }}
            />

            <button className="delButton" onClick={() => {handleDeleteEvent(i)}}>X</button>
            </div>
          </div>
        ))}

        <div className="probButtonContainer">
        <button className="probButton" onClick={handleAddEvent}>Agregar evento</button>

        <button className="probButton" onClick={handleCreateExperiment}>Crear experimento</button>
        </div>

        
        {experiment && (
          <>
            <h3>Ejecutar experimento</h3>
            <div className="eventButtonContainer">
            {Object.keys(experiment.possibleEvents).map((evName) =>(
              <button key={evName} onClick={() => handleRun(evName)}>
                {evName}
              </button>
            ))}
            </div>
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
            <p>
              Espacio muestral: {"{ "}
              {result.outcomes.join(", ")}
              {" }"}
            </p>
            <p>
              Tipo de evento: {" "}
              {experiment.classifyEvent(result.event)}
            </p>
          </div>
        )}

      </article>
    );
}