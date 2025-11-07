import React from "react";
import '../styles/components/MenuButton.css';
import { NavLink } from "react-router-dom";

export const MenuButton = ({ img, children, path }) => {
    return (
        <NavLink to={path} className="menuButton">
            <img src={img} />
            <p>{children}</p>
        </NavLink>
    );
}