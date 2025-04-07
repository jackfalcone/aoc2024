import React, { useState, useEffect } from 'react';
import Part from './Part';
import Solution from './Solution';

const Day01 = () => {
    const [totalDiff, setTotalDiff] = useState(0);

    useEffect(() => {
        fetch('/resources/day01_a.txt')
            .then(response => response.text())
            .then(data => {
                const locationList = data.split('\n');
                const left = [];
                const right = [];

                locationList.forEach(line => {
                    const leftNum = line.match(/^\d+/);
                    const rightNum = line.match(/\d+$/);

                    if (leftNum) {
                        left.push(Number(leftNum[0]));
                    }
                    if (rightNum) {
                        right.push(Number(rightNum[0]));
                    }
                });

                left.sort((a, b) => a - b);
                right.sort((a, b) => a - b);

                let diff = 0;

                for (let i = 0; i < left.length; i ++) {
                    diff += Math.abs(left[i] - right[i]);
                }

                setTotalDiff(diff);
            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    return (
        <div>
            <Part partLetter="A" />
            <Solution solutionText="Total difference" solutionValue={totalDiff} />
        </div>
    )
}

export default Day01;