import React, { useState, useEffect } from "react";
import Part from "./Part";
import Solution from "./Solution";

const Day03 = () => {
    const [mulInstructions, setMulinstructions] = useState([]);
    const [multipliedValue, setMultipliedValue] = useState(0);
    const [mulInstructionsAdvanced, setMulInstructionsAdvanced] = useState([]);
    const [multipliedValuesAdvanced, setMultipliedValuesAdvanced] = useState(0);

    useEffect(() => {
        fetch('/resources/day03.txt')
            .then(response => response.text())
            .then(data => {
                const extractInstructionsRegex = /mul\(\d{1,3},\d{1,3}\)/g
                setMulinstructions(...mulInstructions, data.match(extractInstructionsRegex));
                
                const extractAdvancedRegex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g
                setMulInstructionsAdvanced(...mulInstructionsAdvanced, data.match(extractAdvancedRegex));
            })
            .catch(error => {
                console.error(error);
           });
    }, [])

    useEffect(() => {
        if (mulInstructions) {
            const mulInstructionsArr = [...mulInstructions];
            let multipliedValueCounter = 0;
            mulInstructionsArr.forEach(mulInstruction => multipliedValueCounter += mulInstructionExec(mulInstruction));

            setMultipliedValue(multipliedValueCounter);
        }
    }, [mulInstructions])

    useEffect(() => {
        if (mulInstructionsAdvanced) {
            const mulInstructionsAdvancedArr = [...mulInstructionsAdvanced];
            let multipliedValueCounter = 0;
            let doMultiply = true;
            
            mulInstructionsAdvancedArr.forEach(mulInstruction => {
                if (mulInstruction === "do()") {
                    doMultiply = true;
                } else if (mulInstruction === "don't()") {
                    doMultiply = false;
                } else if (doMultiply) {
                    multipliedValueCounter += mulInstructionExec(mulInstruction);
                }
            })

            setMultipliedValuesAdvanced(multipliedValueCounter);
        }
    }, [mulInstructionsAdvanced])

    const mulInstructionExec = (mulInstruction) => {
        const numbersMatch = mulInstruction.match(/mul\((\d{1,3}),\s*(\d{1,3})\)/);
        const leftNum = parseInt(numbersMatch[1], 10);
        const rightNum = parseInt(numbersMatch[2], 10);

        return leftNum * rightNum;
    };

    return (
        <div>
            <Part partLetter="A" />
            <Solution solutionText={"All uncorrupted mul instructions added up"} solutionValue={multipliedValue} />
            <Part partLetter="B" />
            <Solution solutionText={"All advanced mul instructions added up"} solutionValue={multipliedValuesAdvanced} />
        </div>
    )
}

export default Day03;