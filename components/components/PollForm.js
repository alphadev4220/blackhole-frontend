import React, { Component } from "react";
import Clock from "../components/Clock";
import Footer from '../components/footer';
import axios from 'axios'
import constants from '../../src/constants';

export default class Createpage extends Component {

constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      files: [],
    };
  }

  onChange(e) {
    var files = e.target.files;
    // console.log(files);
    var filesArr = Array.prototype.slice.call(files);
    // console.log(filesArr);
    document.getElementById("file_name").style.display = "none";
    this.setState({ files: [...this.state.files, ...filesArr] });
  }

  submitForm() {
    const title = document.getElementById("title").value;
    var formObj = { title: title }
    // console.log(constants.API_URL + '/api/polls')
    axios.post(constants.API_URL + '/api/polls', formObj).then(response => {
        // console.log(response)
        if (response.data.error){
          alert(response.data.error)
        }
        else {
          window.location.replace('/admin');
        }
    })
  }

render() {
    return (
      <div>

        <section className='jumbotron breadcumb no-bg'>
          <div className='mainbreadcumb'>
            <div className='container'>
              <div className='row m-10-hor'>
                <div className='col-12'>
                  <h1 className='text-center'>Poll</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='container'>
        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
              <form id="form-create-item" className="form-border" action="#">
                  <div className="field-set">
                      <h5>Title</h5>
                      <input required type="text" name="title" id="title" className="form-control" />
                      <input onClick={this.submitForm} type="button" id="submit" className="btn-main" value="Create Poll"/>
                  </div>
              </form>
          </div>
      </div>

      </section>

        <Footer />
      </div>
   );
  }
}