/*
    Ishaan Agarwal
    1/28/2025

    WordDuckPage.js displays the WordDuck component and provides the individual page for the Word Duck Game.
*/

import React, { useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown, Figure, Row, Col, Button, Card } from "react-bootstrap";
import WordDuck from "../WordHunt/WordHunt";


const WordDuckPage = () => {

    return (
        <>
            <WordDuck />
        </>
    )
}

export default WordDuckPage;