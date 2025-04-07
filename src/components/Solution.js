import React from "react";

const Solution = ({ solutionText, solutionValue }) => (
    <>
         <p className="text-lg text-lime-200 font-Audiowide">
            {solutionText}: 
                <span className="ml-2 text-white">
                    {solutionValue}
                </span>
         </p>
    </>
);

export default Solution;