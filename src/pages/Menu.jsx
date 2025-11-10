import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuButton } from "../components/MenuButton";
import '../styles/Menu.css';

export const  Menu = () => {
    
    useEffect(() => {
        document.title = "Menú"
    }, []);

    return (
        <article className="menuPage">
            <h2>¡Bienvenido!</h2>
            <div className="buttonContainer">
                <MenuButton img={"/probabilities.png"} path={"/probabilities"}>Probabilidades</MenuButton>
                <MenuButton img={"/statistics.png"} path={"/statistics"}>Estadísticas</MenuButton>
            </div>
        </article>
    );
}