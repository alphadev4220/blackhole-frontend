import React from 'react';

const DonutChart = () => {

    return (
        <><div className="svg-item">
            <svg width="100%" height="100%" viewBox="0 0 40 40" className="donut">
                <circle className="donut-hole" cx="20" cy="20" r="15.91549430918954" fill="#202631"></circle>
                <circle className="donut-ring" cx="20" cy="20" r="15.91549430918954" fill="transparent" strokeWidth="3.5"></circle>
                <circle className="donut-segment donut-segment-2" cx="20" cy="20" r="15.91549430918954" fill="transparent" strokeWidth="3.5" strokeDasharray="69 31" strokeDashoffset="25"></circle>
                <g className="donut-text donut-text-1">

                    <text y="50%" transform="translate(0, 2)">
                        <tspan x="50%" textAnchor="middle" className="donut-percent">69%</tspan>
                    </text>
                    <text y="60%" transform="translate(0, 2)">
                        <tspan x="50%" textAnchor="middle" className="donut-data">3450 widgets</tspan>
                    </text>
                </g>
            </svg>
        </div>
            </>
    )

};
export default DonutChart;