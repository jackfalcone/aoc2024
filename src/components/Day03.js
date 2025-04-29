import React, { useState, useEffect } from "react";
import Part from "./Part";
import Solution from "./Solution";

const Day03 = () => {
    const [mulInstructions, setMulinstructions] = useState([]);
    const [multipliedValue, setMultipliedValue] = useState(0);

    useEffect(() => {
        fetch('/resources/day03.txt')
            .then(response => response.text())
            .then(data => {
                const extractInstructionsRegex = /mul\(\d{1,3},\d{1,3}\)/g
                setMulinstructions(...mulInstructions, data.match(extractInstructionsRegex));
            })
            .catch(error => {
                console.error(error);
           });
    }, [])

    useEffect(() => {
        if (mulInstructions) {
            const mulInstructionsArr = [...mulInstructions];
            mulInstructionsArr.forEach(mulInstruction => {
                const numbersMatch = mulInstruction.match(/mul\((\d{1,3}),\s*(\d{1,3})\)/);
                const leftNum = parseInt(numbersMatch[1], 10);
                const rightNum = parseInt(numbersMatch[2], 10);

                setMultipliedValue(value => value += leftNum * rightNum);
            })
        }
    }, [mulInstructions])

    return (
        <div>
            <Part partLetter="A" />
            <Solution solutionText={"All uncorrupted mul instructions added up"} solutionValue={multipliedValue} />
        </div>
    )
}

export default Day03;