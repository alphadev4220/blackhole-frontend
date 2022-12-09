import React from "react"
import Link from 'next/link'
import axios from 'axios'
import constants from '../../src/constants';
import DonutChart from '../components/DonutChart' 

// eslint-disable-next-line react/display-name
const PollResultsTable = ({ pollResults }) => {

    if (!pollResults){
        return <div></div>
    }

    return <div style={{marginTop: 20, marginBottom:20}}>

        <div style={{margin: 'auto', textAlign: 'center', marginBottom: 20}}>
            Poll Results
        </div>

        <table className="pollResults" >
            <tr>
                <th>Name</th>
                <th>Votes</th>
                <th>Percent</th>
            </tr>
        { pollResults.poll_options.map((pollOption, index) => 
            <tr key={index} >
                <td>{pollOption.description}</td>
                <td>{pollOption.weighted_votes }</td>
                <td>{pollOption.weighted_percent }% </td>
            </tr>
        )}
        </table>
        
        </div>
}

export default PollResultsTable;