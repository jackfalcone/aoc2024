import React, { useState, useEffect } from "react";
import Part from "./Part";
import Solution from "./Solution";

const Day04 = () => {
    const [grid, setGrid] = useState([]);
    const [wordCount, setWordCount] = useState(0);

    const directions = [
        [0, 1],   // right →
        [0, -1],  // left ←
        [1, 0],   // down ↓
        [-1, 0],  // up ↑
        [1, 1],   // down-right ↘
        [1, -1],  // down-left ↙
        [-1, 1],  // up-right ↗
        [-1, -1]  // up-left ↖
    ];

    const findXmas = ({
        limits: {
            rowMin,
            rowMax,
            colMin,
            colMax
        },
        position: {
            row,
            col
        },
        direction: {
            rowDirection,
            colDirection
        }
    }) => {
        const letters = [];
        
        for (let i = 1; i <= 3; i++) {
            
            const newRow = row + (rowDirection * i);
            const newCol = col + (colDirection * i);

            // Of Limits?
            if (newRow < rowMin || newRow > rowMax || newCol < colMin || newCol > colMax) {
                return false;
            } else {

                letters.push(grid[newRow][newCol]);
            }
        }

        if (letters.length === 3) {
            const word = letters.join('');
            if (word === 'MAS') return true;
            return false;
        }

    };

    useEffect(() => {
        fetch('/resources/day04.txt')
           .then(response => response.text())
           .then(data => {
                const grid = data.trim().split('\n').map(line => line.trim());
                setGrid(grid);
           })
    }, []);

    useEffect(() => {
        if (grid.length > 0) {

            let foundXmasCounter = 0;

            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    if (grid[i][j] === 'X') {
                        directions.forEach(direction => {
                            const foundXmas = findXmas({
                                limits: {
                                    rowMin: 0,
                                    rowMax: grid.length - 1,
                                    colMin: 0,
                                    colMax: grid[i].length - 1
                                },
                                position: {
                                    row: i,
                                    col: j
                                },
                                direction: {
                                    rowDirection: direction[0],
                                    colDirection: direction[1]
                                }
                            })

                            if (foundXmas) {
                                foundXmasCounter++;
                            }
                        });
                    };
                };
            };
            
            setWordCount(foundXmasCounter);
        };  
    }, [grid]);

    return (
        <div>
            <Part partLetter="A" />
            <Solution solutionText="XMAS Count" solutionValue={wordCount} />
        </div>
    )
}

export default Day04;