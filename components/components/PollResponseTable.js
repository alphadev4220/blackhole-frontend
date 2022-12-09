import React from "react"
import Link from 'next/link'
import axios from 'axios'
import constants from '../../src/constants';

// eslint-disable-next-line react/display-name
const PollResponseTable = ({pollResponses}) => {
// console.log('pollResponses', pollResponses)
var pollResponseRows = []
for (var i =0; i < pollResponses.length; i++ ){
    const pollResponse = pollResponses[i]
    pollResponseRows.push(
        <div key={i}>{pollResponse.id}</div>
    );
}


    return <div style={{marginTop: 20, marginBottom:20, backgroundColor: "#333333"}}>
        <table>
            <tr>
                <th>Id</th>
                <th>Address</th>
                <th>Tokens Held</th>
                <th>Option Selected</th>
            </tr>
        { pollResponses.map((pollResponse, index) => 
            <tr key={index} >
                <td key={i}>{pollResponse.id}</td>
                <td key={i}>{pollResponse.crypto_address}</td>
                <td key={i}>{pollResponse.total_tokens_at_snapshot } </td>
                <td key={i}>{pollResponse.poll_option_id } </td>
            </tr>
        )}    
        </table>
        </div>
}

export default PollResponseTable;