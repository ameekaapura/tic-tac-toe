import React, { useState, useRef } from 'react'
import './TicTacToe.css'
import frog_icon from '../Assets/frog.png'
import tomato_icon from '../Assets/tomato.png'
import frog_sound from '../Assets/frog_sound.mp3'
import tomato_sound from '../Assets/tomato_sound.mp3'
import winner_sound from '../Assets/winner.wav'
import draw_sound from '../Assets/draw.mp3'
import reset_sound from '../Assets/reset.mp3'

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    // define state variables
    const [frogSound] = useState(new Audio(frog_sound));
    const [tomatoSound] = useState(new Audio(tomato_sound));
    const [winnerSound] = useState(new Audio(winner_sound));
    const [drawSound] = useState(new Audio(draw_sound));
    const [resetSound] = useState(new Audio(reset_sound));

    const [lockedBoxes, setLockedBoxes] = useState(Array(9).fill(false));
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let titleRef = useRef(null);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);

    let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9]

    // player sound function
    const playSound = (player) => {
        if (player === 'x' && frogSound) {
            frogSound.play();
        } else if (player === 'o' && tomatoSound) {
            tomatoSound.play();
        }
    };

    // toggle between x and o
    const toggle = (e, num) => {
        if (lock || lockedBoxes[num]) {
            return null;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${frog_icon}'>`
            data[num] = "x";
            setCount(++count);
            playSound('x');
        }
        else {
            e.target.innerHTML = `<img src='${tomato_icon}'>`
            data[num] = "o";
            setCount(++count);
            playSound('o');
        }

        const updatedLockedBoxes = [...lockedBoxes];
        updatedLockedBoxes[num] = true;
        setLockedBoxes(updatedLockedBoxes);

        checkWin();
    }

    // check if win or draw
    const checkWin = () => {
        let draw = true;

        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        // Check each winning combination
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                // If the symbols match in the combination, call the won function with the winning symbol
                won(data[a]);
                return;
            }
        }

        for (let i = 0; i < 9; i++) {
            if (data[i] === "") {
                draw = false;
                break;
            }
        }
        if (draw) {
            setLock(true);
            titleRef.current.innerHTML = `It's a draw!`
            drawSound.play();
        }
    }

    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            titleRef.current.innerHTML = `Congratulations: <img src=${frog_icon}> wins!`
            winnerSound.play();
        }
        else {
            titleRef.current.innerHTML = `Congratulations: <img src=${tomato_icon}> wins!`
            winnerSound.play();
        }
    }

    const reset = () => {
        setLock(false);
        setLockedBoxes(Array(9).fill(false));
        data = ["", "", "", "", "", "", "", "", ""];
        titleRef.current.innerHTML = 'TIC TAC TOE';
        box_array.map((e) => {
            e.current.innerHTML = "";
            resetSound.play();
            return null;
        })
    }

    return (
        <div className='container'>
            <h1 className="title" ref={titleRef}>TIC TAC TOE</h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" ref={box1} onClick={(e) => { toggle(e, 0) }}></div>
                    <div className="boxes" ref={box2} onClick={(e) => { toggle(e, 1) }}></div>
                    <div className="boxes" ref={box3} onClick={(e) => { toggle(e, 2) }}></div>
                </div>
                <div className="row2">
                    <div className="boxes" ref={box4} onClick={(e) => { toggle(e, 3) }}></div>
                    <div className="boxes" ref={box5} onClick={(e) => { toggle(e, 4) }}></div>
                    <div className="boxes" ref={box6} onClick={(e) => { toggle(e, 5) }}></div>
                </div>
                <div className="row3">
                    <div className="boxes" ref={box7} onClick={(e) => { toggle(e, 6) }}></div>
                    <div className="boxes" ref={box8} onClick={(e) => { toggle(e, 7) }}></div>
                    <div className="boxes" ref={box9} onClick={(e) => { toggle(e, 8) }}></div>
                </div>
            </div>
            <button className="reset" onClick={() => { reset() }}>RESET</button>
        </div>
    )
}

export default TicTacToe