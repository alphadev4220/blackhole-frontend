import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HomePage from '../components/pages/home'
import axios from 'axios'
import Link from 'next/link'
import BiddyHeader from '../components/menu/BiddyHeader';
import PollListing from '../components/components/PollListing';
import Create from '../components/pages/create';
import constants from '../src/constants';
import Modal from 'react-modal';
import lscache from 'lscache';

const customStyles = {
  content: {
  
    top: '50%',
    backgroundColor: '#000',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


export default function Home() {
  const [polls, setPolls] = useState([]);
  const [poll, setPoll] = useState([]);
  
  const votingKey = lscache.get('voting_key');
  console.log('votingKey', votingKey);
  useEffect(() => {
    axios.get(constants.API_URL + '/api/polls?voting_key=' + votingKey).then(response => {
      console.log(response.data)
      setPolls(response.data)
    })
    // Update the document title using the browser API
  }, []);
  const [modalIsOpen, setIsOpen] = useState(false);
  const closeModal = () => {
      setIsOpen(false)
      // console.log('oijdfajoisdf');
  }
  const openModal = (poll) => {
      setPoll(poll)
      setIsOpen(true)
      // console.log('oijdfajoisdf');
  }
  
  const startCampaign = () => {
    const startTime = document.getElementById("start_time").value;
    const duration = document.getElementById("duration").value;
    const votingKey = lscache.get('voting_key');
    const formData = {duration: duration, start_time: startTime,
      poll_id: poll.id, voting_key: votingKey };
    axios.post(constants.API_URL + '/api/poll_campaigns/', formData).then(response => {
      console.log(response)
      if (response.data.error){
        alert(response.data.error)
      }
      else {
        window.location.reload();
      }
  })
    // startCampaign F
  }

  return (
    <div>
      <Head>
        <title>Blackhole Admin</title>
      </Head>
      <BiddyHeader />
      <div>
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="col-lg-7 offset-lg-1 mb-5">
            <form id="form-create-item" className="form-border" action="#">
                <div className="field-set">
                    <h5>{poll.title} </h5>
                    <div>
                      <div>
                        <label >Choose a time to start the poll:</label>
                      </div>
                      <div>
                        <input type="datetime-local" id="start_time"
                          name="start_time" ></input>
                      </div>
                    </div>
                  <div>
                    <div>
                      <label htmlFor="duration" >Duration of Poll in Hours:</label>
                    </div>
                    <div>
                      <input type="number" id="duration" name="duration"
                      min="1" max="100"></input>
                      </div>
                    </div>
                    <input onClick={startCampaign} type="button" id="submit" className="btn-main" value="Initiate Campaign"/>
                </div>
            </form>
        </div>
    </Modal>
      <section className='container' style={{marginTop: 180}}>

      <div className='row'>
          <div className='col-lg-12'>
          <div>
            
        <div>
            Polls
        </div>
        <div>
        <Link href="/pollform">
          New Poll
        </Link>
        </div>
        <div>
        { polls.map( (poll, index) => (          
            <PollListing 
              startCampaignFunction={startCampaign}
              openModalFunction={openModal} 
              key={index} 
              poll={poll} 
              pollOptions={poll.poll_options} />
          ))
        }
      </div>
        <div>
            
        </div>
      </div>
            </div>
        </div>
        </section>
        </div>
      
    </div>
  )
}
