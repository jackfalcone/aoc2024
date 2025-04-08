import React, { useState, useEffect } from 'react';
import Part from './Part';
import Solution from './Solution';

const Day01 = () => {
    const [totalDiff, setTotalDiff] = useState(0);
    const [leftNums, setLeftNums] = useState([]);
    const [rightNums, setRightNums] = useState([]);
    const [similarityScore, setSimilarityScore] = useState(0);

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

                setLeftNums(left);
                setRightNums(right);

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

    useEffect(() => {
        if (leftNums.length === 0 || rightNums.length === 0) {
            return;
        }

        const leftNumsArr = [...leftNums];
        const rightNumsArr = [...rightNums];
        let score = 0;

        const countOccurences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

        leftNumsArr.forEach(leftNum => {
            score += countOccurences(rightNumsArr, leftNum) * leftNum;
        });

        setSimilarityScore(score);
    }, [leftNums, rightNums])

    return (
        <div>
            <Part partLetter="A" />
            <Solution solutionText="Total difference" solutionValue={totalDiff} />
            <Part partLetter="B" />
            <Solution solutionText="Similarity score" solutionValue={similarityScore} />
        </div>
    )
}

export default Day01;