import React, { Component } from "react";
import Clock from "../components/Clock";
import Footer from '../components/footer';

export default class Createpage extends Component {

constructor() {
    super();
    this.onChange = this.onChange.bind(this);
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

  }

render() {
    return (
      <div>

        <section className='jumbotron breadcumb no-bg'>
          <div className='mainbreadcumb'>
            <div className='container'>
              <div className='row m-10-hor'>
                <div className='col-12'>
                  <h1 className='text-center'>Poll Form</h1>
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
                      <h5>Description</h5>
                      <input type="text" name="item_title" id="item_title" className="form-control" />
                      <input type="button" id="submit" className="btn-main" value="Create Poll"/>
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