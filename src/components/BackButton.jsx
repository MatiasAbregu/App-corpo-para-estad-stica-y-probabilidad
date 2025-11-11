import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/components/BackButton.css'

export const BackButton = ({ url }) => {
    return (
        <NavLink to={url} className={"backButton"}>
            <span class="material-symbols-outlined">
                arrow_back
            </span>
        </NavLink>
    )
}