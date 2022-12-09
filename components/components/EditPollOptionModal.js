import React, { useState } from "react";
import Clock from "../components/Clock";
import Footer from '../components/footer';
import axios from 'axios'
import constants from '../../src/constants';
import Modal from 'react-modal';
import lscache from "lscache";

// Modal.setAppElement('#yourAppElement');

const customStyles = {
    content: {
        width: 500,
      top: '50%',
      backgroundColor: '#000',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export default function EditPollOptionModal({pollOption, modalIsOpen, modalCloseFunction}){
    const [localModalIsOpen, setLocalModalIsOpen] = useState(true);
    // const [formValuesSet, setFormValuesSet ] = useState(false)
    const [formValues, setFormValues] = useState({});
    
    React.useEffect(
        () => {
            // console.log('pollOption', pollOption)
            // if (!formValuesSet && pollOption.id){
                // console.log("fiojasdf")
                setFormValues({description: pollOption.description, 
                thumbnail_url: pollOption.thumbnail_url})
                // setFormValuesSet(true)
            // }
        }, [pollOption]
    )

    const updateFormValues = (fieldName) => {
        const newValue = document.getElementById(fieldName).value
        var currentFormValues = Object.assign({}, formValues)
        currentFormValues[fieldName] = newValue
        // console.log('currentFormValues', currentFormValues)
        setFormValues(currentFormValues)
    }

    const updateOption = () => {
        const title = document.getElementById("description").value;
        const thumbnailUrl = document.getElementById("thumbnail_url").value;
        const votingKey = lscache.get('voting_key');
        var formObj = { 
            description: title, 
            thumbnail_url: thumbnailUrl,
            voting_key: votingKey
          }
          // console.log('formObj', formObj)
        axios.put(constants.API_URL + '/api/poll_options/' + pollOption.id, formObj).then(response => {
            // console.log(response)
            if (response.data.error){
              alert(response.data.error)
            }
            else {
              window.location.reload();
            }
        })
      }

        console.log('formValues', formValues)

    return <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={modalCloseFunction}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="col-lg-7 offset-lg-1 mb-5">
              <form id="form-create-item" className="form-border" action="#">
                  <div className="field-set">
                      <h5>Description</h5>
                      <input style={{border: '1px solid #ffffff' }} 
                            required 
                            type="text" 
                            name="description" 
                            id="description" className="form-control" 
                            value={formValues.description}
                            onChange={() => updateFormValues("description")}
                            />
                      <h5>Thumbnail</h5>
                      <input value={formValues.thumbnail_url } 
                            onChange={() => updateFormValues("thumbnail_url")}
                                style={{border: '1px solid #ffffff' }} required type="text" name="thumbnail_url" id="thumbnail_url" className="form-control" />
                      <input onClick={updateOption} 
                                        type="button" 
                                        id="submit" 
                                        className="btn-main" value="Update Option"/>
                  </div>
              </form>
          </div>
      </Modal>
  </div>
}