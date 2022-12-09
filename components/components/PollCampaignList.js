import React from "react"
import Link from 'next/link'
import PollResponseTable from './PollResponseTable'
import PollResultsTable from "./PollResultsTable"
import axios from 'axios'
import constants from '../../src/constants';
import { getBalance } from '../../lib/CosmosHelper'
// eslint-disable-next-line react/display-name
const PollCampaignList = ({poll}) => {
    // console.log('pollCampaign', poll)

    const takeSnapshot = async (pollCampaignId) => {
        const response = await axios.get(constants.API_URL + '/api/take_snapshot/'+ pollCampaignId)
        // console.log('response', response);
        const pollResponses = response.data.poll_responses;
        var snapShotBalances = [];
        for (var i=0; i < pollResponses.length; i++) {
            const pollResponse = pollResponses[i];
            const pollResponseBalance = await getBalance(pollResponse.crypto_address);
            console.log('pollResponseBalance', pollResponseBalance);
            snapShotBalances.push({
                id: pollResponse.id, 
                total_tokens_at_snapshot: pollResponseBalance
            });
        }

        var formObj = { snapshot_balances: snapShotBalances }

        var r = await axios.post(constants.API_URL + '/api/record_snapshot/' + pollCampaignId, 
            formObj);
        

    }

    return <section>
        <div className="row">
      <div className="col-lg-7 offset-lg-1 mb-5">
        <div>
            Campaigns
        </div>
    <div style={{marginTop: 20, marginBottom:20, backgroundColor: "#333333"}}>
        {poll.poll_campaigns.map((pollCampaign, index) =>
        <div key={index} >
            <div >
                <div style={{margin: 5}} >  Start Time: {(new Date(pollCampaign.start_time)).toLocaleString()}</div>
                <div style={{margin: 5}} >  End Time: {(new Date(pollCampaign.end_time)).toLocaleString()}</div>
                <div style={{margin: 5}} >  Responses: {pollCampaign.total_responses}</div>
                <div onClick={ () => takeSnapshot(pollCampaign.id) } style={{margin: 5, cursor: 'pointer'}} > Take Snapshot </div>
            </div>
            <PollResultsTable pollResults={pollCampaign.results}/>
            </div>
        )}
        
    </div>
    </div>
    </div>
    </section>
}

export default PollCampaignList;