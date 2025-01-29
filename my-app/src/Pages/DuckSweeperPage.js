/*
    Ishaan Agarwal
    1/28/2025

    DuckSweeperPage.js displays the DuckSweeper component and provides the individual page for the Duck Sweeper Game.
*/

import React, { useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown, Figure, Row, Col, Button, Card } from "react-bootstrap";
import DuckSweeper from "../MineSweeper/MineSweeper";


const DuckSweeperPage = () => {

    return (
        <>
            <DuckSweeper />
        </>
    )
}

export default DuckSweeperPage;