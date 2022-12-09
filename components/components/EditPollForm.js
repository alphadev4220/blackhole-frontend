import React, { useState } from "react";
import Clock from "../components/Clock";
import EditPollOptionModal from "../components/EditPollOptionModal";
import Footer from '../components/footer';
import axios from 'axios'
import constants from '../../src/constants';
import Modal from 'react-modal';
import lscache from "lscache";

// Modal.setAppElement('#yourAppElement');

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

export default function EditPollForm({poll}){
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedPollOption, setSelectedPollOption] = useState(false);
    const [editOptionModalIsOpen, setEditOptionModalIsOpen] = useState(false);
    const votingKey = lscache.get('voting_key');
    const closeModal = () => {
        setIsOpen(false)
        // console.log('oijdfajoisdf');
    }
    const openModal = () => {
        setIsOpen(true)
        // console.log('oijdfajoisdf');
    }
    const openPollOptionModal = (pollOption) => {
      setSelectedPollOption(pollOption)
      setEditOptionModalIsOpen(true)
      // setIsOpen(false)
      // console.log('oijdfajoisdf');
  }
  const closepollOptionModal = () => {
    setEditOptionModalIsOpen(false)
      // console.log('oijdfajoisdf');
  }
    
    const addOption = () => {
        const title = document.getElementById("description").value;
        const thumbnailUrl = document.getElementById("thumbnail_url").value;
        var formObj = { 
            description: title, 
            poll_id: poll.id, 
            thumbnail_url: thumbnailUrl,
            voting_key: votingKey
          }
        // console.log(constants.API_URL + '/api/polls')
        axios.post(constants.API_URL + '/api/poll_options/', formObj).then(response => {
            // console.log(response)
            if (response.data.error){
              alert(response.data.error)
            }
            else {
              window.location.reload();
            }
        })
      }

      const deletePollOption = (pollOptionId) => {
        if (confirm("Are you sure?")){
            axios.post(constants.API_URL + '/api/inactivate_poll_option/' + pollOptionId + "?voting_key=" + votingKey, {}).then(response => {
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

    return <div>

    <section className='container' style={{marginTop: 100}}>
      <div className='mainbreadcumb'>
        <div className='container'>
          <div className='row m-10-hor'>
            <div className='col-12'>
              <h1 className='text-center'>{ poll.title }</h1>
            </div>
          </div>
        </div>
      </div>
      <EditPollOptionModal 
        modalCloseFunction={closepollOptionModal} 
        modalIsOpen={editOptionModalIsOpen} 
        pollOption={ selectedPollOption } />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="col-lg-7 offset-lg-1 mb-5">
              <form id="form-create-item" className="form-border" action="#">
                  <div className="field-set">
                      <h5>Description</h5>
                      <input style={{border: '1px solid #ffffff' }} required type="text" name="description" id="description" className="form-control" />
                      <h5>Thumbnail</h5>
                      <input style={{border: '1px solid #ffffff' }} required type="text" name="thumbnail_url" id="thumbnail_url" className="form-control" />
                      <input onClick={ addOption } type="button" id="submit" className="btn-main" value="Add Option"/>
                  </div>
              </form>
          </div>
      </Modal>
    </section>
    
    
    
    <section className='container'>
    <div className="row">
      <div className="col-lg-7 offset-lg-1 mb-5">
        Poll Options
      </div>
      <div className="col-lg-7 offset-lg-1 mb-5">
          <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                  <input onClick={ setIsOpen } type="button" id="submit" className="btn-main" value="Add Option"/>
              </div>
          </form>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-7 offset-lg-1 mb-5" style={{display: 'flex', flexDirection: 'row'}}>
      {poll.poll_options.map((pollOption, index) =>
        <div style={{margin: 40, textAlign: 'center' }} key={index} >
              <img src={pollOption.thumbnail_url} />
              <div style={{textAlign: 'center', cursor: 'pointer'}} > {pollOption.description}</div>
              <div onClick={() => openPollOptionModal(pollOption)} style={{textAlign: 'center', cursor: 'pointer'}} > edit </div>
              <div onClick={() => deletePollOption(pollOption.id)} style={{textAlign: 'center', cursor: 'pointer', color: 'red'}} > delete </div>
        </div>
      )}
    </div>
    </div>

  </section>

    
  </div>
}

