import React from "react"
import Link from 'next/link'
import axios from 'axios'
import constants from '../../src/constants';

// eslint-disable-next-line react/display-name
const PollListing = ({poll, pollOptions, openModalFunction, startCampaignFunction}) => {

    const deletePoll = () => {
        if (confirm("Are you sure?")){
            axios.post(constants.API_URL + '/api/inactivate_poll/' + poll.id, {}).then(response => {
                // console.log(response)
                if (response.data.error){
                alert(response.data.error)
                }
                else {
                window.location.reload();
                }
            })
        }
    }

    return <div style={{marginTop: 20, marginBottom:20, backgroundColor: "#333333"}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div>
                <Link href={'polldetail/' + poll.id}>
                {poll.title}
                </Link>
            </div>
            <div style={{marginLeft: 30}} onClick={() => openModalFunction(poll) } >
                Start Campaign
            </div>
            <div style={{color: 'red',marginLeft: 30}} onClick={deletePoll} >
                Delete
            </div>
        </div>
        {/* {pollOptions.map((pollOption, index) =>
            
            <div key={index}> ----- {pollOption.description}</div>
        )} */}
        
    </div>
}

export default PollListing;