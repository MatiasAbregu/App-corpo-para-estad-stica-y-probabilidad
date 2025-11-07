import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const  Statistics = () => {
    
    useEffect(() => {
        document.title = "Estadísticas"
    }, []);

    return (
        <p>Estadísticas (:</p>
    );
}