import React, { useState, useEffect } from "react";
import Part from "./Part";
import Solution from "./Solution";

const Day02 = () => {
    const [reportLevels, setReportLevels] = useState({
        initialReports: [],
        safeReports: [],
        unsafeReports: [],
        dampedSafeReports: [],
        dampedUnsafeReports: [],
    });

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

                setReportLevels(prev => ({
                    ...prev,
                    initialReports: reportsLevelsStructured
                }));
            })
            .catch(error => {
                console.error(error);
           });
    }, [])

    useEffect(() => {
        if (reportLevels.initialReports.length > 0) {
            const safeReportLevelsArr = [];
            const unsafeReportLevelsArr = [];
            const reportLevelsArr = [...reportLevels.initialReports];
            reportLevelsArr.forEach(reportLevel => {
                const [isSafe, reportLevelChecked] = checkReportLevels(reportLevel);
                (isSafe) ? safeReportLevelsArr.push(reportLevelChecked) : unsafeReportLevelsArr.push(reportLevelChecked);
            });
            setReportLevels(prev => ({
                ...prev,
                safeReports: safeReportLevelsArr,
                unsafeReports: unsafeReportLevelsArr
            }));
        }
    }, [reportLevels.initialReports])
    
    useEffect(() => {
        if (reportLevels.unsafeReports.length > 0) {
            const dampedSafeReportLevelsArr = [];
            const unsafeReportLevelsArr = [...reportLevels.unsafeReports];
            unsafeReportLevelsArr.forEach(reportLevel => {
                for (let i = 0; i < reportLevel.length; i++) {
                    const originalReportLevel = [...reportLevel];
                    const modifiedReportLevel = [...reportLevel];
                    modifiedReportLevel.splice(i, 1);
                    const [isSafe, reportLevelChecked] = checkReportLevels(modifiedReportLevel);
                    if (isSafe) {
                        dampedSafeReportLevelsArr.push(originalReportLevel);
                        break;
                    }
                }
            })
            setReportLevels(prev => ({
                ...prev,
                dampedSafeReports: dampedSafeReportLevelsArr
            }));
        }
    }, [reportLevels.unsafeReports])
    

    const checkReportLevels = reportLevel => {
            let isSafe = false;
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
                    isSafe = true;
                }
            }

        return [isSafe, reportLevel];
    };

    return (
        <div>
            <Part partLetter="A" />
            <Solution solutionText={"Safe reports amount"} solutionValue={reportLevels.safeReports.length} />
            <Solution solutionText={"Unsafe reports amount"} solutionValue={reportLevels.unsafeReports.length} />
            <Part partLetter="B" />
            <Solution solutionText={"Damped safe reports amount"} solutionValue={reportLevels.dampedSafeReports.length} />
            <Solution solutionText={"Reports safe combined"} solutionValue={reportLevels.dampedSafeReports.length + reportLevels.safeReports.length} />
            <Solution solutionText={"Damped unsafe reports amount"} solutionValue={reportLevels.unsafeReports.length - reportLevels.dampedSafeReports.length} />
        </div>
    )
}

export default Day02;