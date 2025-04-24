import React, { useState, useEffect } from "react";
import Part from "./Part";
import Solution from "./Solution";

const Day02 = () => {
    const [reportLevels, setReportLevels] = useState([]);
    const [safeReportLevels, setSafeReportLevels] = useState([]);
    const [unsafeReportLevels, setUnsafeReportLevels] = useState([]);

    useEffect(() => {
        fetch('/resources/day02.txt')
            .then(response => response.text())
            .then(data => {
                const reportLevelsArr = data.split('\n');
                const reportsLevelsStructured = [];

                reportLevelsArr.forEach(line => {
                    const reportLevel = line.split(' ').map(Number);
                    reportsLevelsStructured.push(reportLevel);
                });

                setReportLevels(reportsLevelsStructured);
            })
            .catch(error => {
                console.error(error);
           });
    }, [])

    useEffect(() => {
        if (reportLevels.length > 0) {
            const reportLevelsArr = [...reportLevels];
            const {safeReportLevelsArr, unsafeReportLevelsArr} = checkReportLevels(reportLevelsArr);
            setSafeReportLevels(safeReportLevelsArr);
            setUnsafeReportLevels(unsafeReportLevelsArr);
        }
    }, [reportLevels])

    const checkReportLevels = reportLevelsArr => {
        const safeReportLevelsArr = [];
        const unsafeReportLevelsArr = [];
        reportLevelsArr.forEach(reportLevel => {
            const positiveSteps = [];
            const stepsAmount = [];
            for (let i = 0; i < reportLevel.length; i++) {
                if (i > 0) {
                    const step = (reportLevel[i] > reportLevel[i - 1]) ? true : false;
                    positiveSteps.push(step);
                    stepsAmount.push(Math.abs(reportLevel[i] - reportLevel[i - 1]));
                }
            }
            if (positiveSteps.every(step => step === true) || positiveSteps.every(step => step === false)) {
                if (stepsAmount.every(step => [1, 2, 3].includes(step))) {
                    safeReportLevelsArr.push(reportLevel);
                } else {
                    unsafeReportLevelsArr.push(reportLevel);
                }   
            } else {
                unsafeReportLevelsArr.push(reportLevel);
            }
        });

        return {safeReportLevelsArr, unsafeReportLevelsArr};
    };

    return (
        <div>
            <Part partLetter="A" />
            <Solution solutionText={"Safe reports amount"} solutionValue={safeReportLevels.length} />
        </div>
    )
}

export default Day02;