import React, { useEffect, useState } from "react";
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import '../styles/Statistics.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { BackButton } from "../components/BackButton";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export const Statistics = () => {

    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);

    const [titleGraph, setTitleGraph] = useState();
    const [nameDataHandle, setNameDataHandle] = useState();
    const [valueHandle, setValueHandle] = useState();
    const [colorHandle, setColorHandle] = useState();

    let totalFrecAbsol = data.reduce((prevValue, currentValue) => prevValue + Number(currentValue.value), 0);
    let frecAbsol = 0;
    let frecRelativeAcum = 0;

    useEffect(() => {
        document.title = "Estadísticas";
    }, []);

    useEffect(() => {
        document.body.style.overflowY = modal ? "hidden" : "auto";
        if (modal) window.scrollTo({ top: 0 });
    }, [modal])

    return (
        <article className="statisticsPage">
            {
                modal ?
                    <div className="modalBack">
                        <div className="leftContainer">
                            <div className="inputModal">
                                <label htmlFor="">Ingrese el dato:</label>
                                <input type="text" value={nameDataHandle} onChange={e => setNameDataHandle(e.target.value)} />
                            </div>
                            <div className="inputModal">
                                <label htmlFor="">Ingrese el valor:</label>
                                <input type="number" value={valueHandle} onChange={e => setValueHandle(e.target.value)} />
                            </div>
                            <div className="inputModal">
                                <label htmlFor="">Escoja el color:</label>
                                <input type="color" value={colorHandle} onChange={e => setColorHandle(e.target.value)} />
                            </div>
                            <div className="buttonContainer">
                                <button type="button" onClick={() => setModal(false)}>Cerrar</button>
                                <button type="button" onClick={() => {
                                    if (nameDataHandle && valueHandle) {
                                        setData(d => [...d, { label: nameDataHandle, value: valueHandle, color: colorHandle }]);
                                        setNameDataHandle("");
                                        setValueHandle("");
                                        setColorHandle("");
                                    }
                                }}>Guardar</button>
                            </div>
                        </div>
                        <div className="rigthContainer">
                            <h3>Datos guardados: </h3>
                            {
                                data ?
                                    data.map((v, i) =>
                                        <div className="data-box" key={i}>
                                            <div>
                                                <p>
                                                    {v.label}: {v.value}
                                                </p>
                                                <span className="box-color" style={{ backgroundColor: v.color }}></span>
                                            </div>
                                            <p className="deleteData" onClick={() => {
                                                setData(d => {
                                                    const copy = [...d];
                                                    return copy.filter((_, index) => index != i);
                                                })
                                            }}>X</p>
                                        </div>)
                                    : undefined
                            }
                        </div>
                    </div> : undefined
            }
            <BackButton url={"/"} />
            <div className="controlContainer">
                <div className="inputModal">
                    <label htmlFor="">Ingrese el nombre de la categoría que graficará:</label>
                    <input type="text" value={titleGraph} onChange={e => setTitleGraph(e.target.value)} />
                </div>
                <div className="buttonsControl">
                    <button type="button" onClick={() => setModal(true)}>Editar datos</button>
                    <span class="material-symbols-outlined" onClick={() => {
                        setData([]);
                        setTitleGraph("");
                    }}>cleaning_services</span>
                </div>
            </div>
            <div className="graphContainer">
                {
                    data.length > 0 ?
                        <>
                            <div>
                                <Doughnut data={{
                                    labels: data.map(item => item.label),
                                    datasets: [{
                                        label: titleGraph,
                                        data: data.map(item => item.value),
                                        borderWidth: 1,
                                        backgroundColor: data.map(item => item.color)
                                    }]
                                }} options={{
                                    responsive: true,
                                    plugins: {
                                        title: { display: true, text: titleGraph }
                                    }
                                }} />
                            </div>
                            <div>
                                <Bar data={{
                                    labels: data.map(item => item.label),
                                    datasets: [{
                                        label: titleGraph,
                                        data: data.map(item => item.value),
                                        borderWidth: 1,
                                        backgroundColor: data.map(item => item.color)
                                    }]
                                }} options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { display: false },
                                        title: { display: true, text: titleGraph }
                                    }
                                }} />
                            </div>
                            <div>
                                <Pie data={{
                                    labels: data.map(item => item.label),
                                    datasets: [{
                                        label: titleGraph,
                                        data: data.map(item => item.value),
                                        borderWidth: 1,
                                        backgroundColor: data.map(item => item.color)
                                    }]
                                }} options={{
                                    responsive: true,
                                    plugins: {
                                        title: { display: true, text: titleGraph }
                                    }
                                }} />
                            </div>
                        </> : <p style={{ color: "white" }}>¡Todavía no hay datos cargados! Carga datos para ver los gráficos y la tabla</p>
                }
            </div>
            {
                data.length > 0 ?
                    <div className="tableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ minWidth: "100px", width: "auto" }}>{titleGraph}</th>
                                    <th>Frecuencia Absoluta</th>
                                    <th>Frecuencia Absoluta Acumulada</th>
                                    <th>Frecuencia Relativa</th>
                                    <th>Frecuencia Relativa Acumulada</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((value, i) => {
                                        frecAbsol += Number.parseFloat(value.value);
                                        frecRelativeAcum += Number.parseFloat(((value.value * 100) / totalFrecAbsol));
                                        return (
                                            <tr key={i}>
                                                <td>{value.label}</td>
                                                <td>{value.value}</td>
                                                <td>{frecAbsol}</td>
                                                <td>{((value.value * 100) / totalFrecAbsol).toFixed(2)}%</td>
                                                <td>{frecRelativeAcum.toFixed(2)}%</td>
                                            </tr>);
                                    })
                                }
                                <tr>
                                    <td>Total</td>
                                    <td>{totalFrecAbsol}</td>
                                    <td></td>
                                    <td>{frecRelativeAcum}%</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div> : undefined
            }
        </article>
    );
}