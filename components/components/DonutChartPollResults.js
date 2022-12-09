import React from 'react';

const DonutChartPollResults = ({pollResults}) => {
    return (
        <div className='donut-charter-cont' style={{zIndex: 9999}}>
        { pollResults.poll_options.map((pollOption, index) => 
            // <tr key={index} >
            //     <td>{pollOption.description}</td>
            //     <td>{pollOption.weighted_votes }</td>
            //     <td>{pollOption.weighted_percent }% </td>
            // </tr>
            <div key={index} className="svg-item">
            <svg width="100%" height="100%" viewBox="0 0 40 40" className="donut">
                <circle className="donut-hole" cx="20" cy="20" r="15.91549430918954" fill="#202631"></circle>
                <circle className="donut-ring" cx="20" cy="20" r="15.91549430918954" fill="transparent" strokeWidth="3.5"></circle>
                <circle className={"donut-segment donut-segment-" + index%4 } cx="20" cy="20" r="15.91549430918954" fill="transparent" strokeWidth="3.5" strokeDasharray={pollOption.weighted_percent + " " + (100 - pollOption.weighted_percent)} strokeDashoffset="25"></circle>
                <g className="donut-text donut-text-1">
                    <text y="50%" transform="translate(0, 2)">
                        <tspan x="50%" textAnchor="middle" className={"donut-percent donut-text-" + index%4 }>{pollOption.weighted_percent}%</tspan>
                    </text>
                    <text y="60%" transform="translate(0, 2)">
                        <tspan x="50%" textAnchor="middle" className="donut-data">{pollOption.description}  </tspan>
                    </text>
                </g>
            </svg>
            </div>
        )}
        
        </div>
    )
};
export default DonutChartPollResults;