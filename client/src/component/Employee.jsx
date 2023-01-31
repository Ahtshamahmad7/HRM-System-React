import React, { Component } from "react";
import "./Employee.css";
import axios from "axios";
import EmployeeTable from "./EmployeeTable.jsx";
import EmployeeForm from "./EmployeeForm.jsx";
import EmployeeFormEdit from "./EmployeeFormEdit.jsx";
import EmployeeInfo from "./EmployeeInfo.jsx";
import { HashRouter as Router, Route } from "react-router-dom";
import PersonalInfo from "./employee/PersonalInfo.jsx";
import Education from "./employee/Education.jsx";
import FamilyInfo from "./employee/FamilyInfo.jsx";
import WorkExperience from "./employee/WorkExperience.jsx";

class Employee extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {},
    addFormGender: "",
    editFormGender: "",
    EmpInfo: {},
    EmpInfoBool: false,

  };
  // redirectF=()=>{
  // //  if(this.state.EmpInfo==true){
  //   this.setState({EmpInfo:false})
  //   return <Redirect to="hr/employee/info" />
  // //  }
  // }

  render() {
    // if (this.state.EmpInfo) {
    //   this.setState({EmpInfo:false});
    //   return <Redirect to="hr/employee/info" />
    // }

    return (
      <Router>
        <Route
          exact
          path="/hr/employee"
          render={props =>
            <React.Fragment>
              {/* {this.redirectF} */}
              {/* {this.state.EmpInfo?this.redirectF:<React.Fragment />} */}
              {this.state.table ? (
                this.state.editForm ? (
                  <EmployeeFormEdit
                    onEmployeeEditUpdate={this.handleEmployeeEditUpdate}
                    onFormEditClose={this.handleEditFormClose}
                    editData={this.state.editData}
                    onGenderChange={this.handleEditFormGenderChange}
                  />
                ) : (


                    !this.state.EmpInfoBool ? <EmployeeTable
                      onAddEmployee={this.handleAddEmployee}
                      onEditEmployee={this.handleEditEmployee}
                      onEmpInfo={this.handleEmpInfo}
                    /> : <EmployeeInfo data={this.state.EmpInfo} onBack={this.handleBack} />

                  )
              ) : (
                  <EmployeeForm
                    onEmployeeSubmit={this.handleEmployeeSubmit}
                    onFormClose={this.handleFormClose}
                    onGenderChange={this.handleAddFormGenderChange}
                  />
                )}
            </React.Fragment>
          }
        />

        {/* <Route
                   exact
                   path="/hr/employee/info"
                   render={props => <EmployeeInfo data={this.state.EmpInfo} onBack={this.handleBack}/>}
                 /> */}
        <Route
          exact
          path="/hr/employee/info/personal-info"
          render={props => <PersonalInfo data={this.state.EmpInfo} back={true} />}
        />
        <Route
          exact
          path="/hr/employee/info/education"
          render={props => <Education data={this.state.EmpInfo} back={true} />}
        />
        <Route
          exact
          path="/hr/employee/info/family-info"
          render={props => <FamilyInfo data={this.state.EmpInfo} back={true} />}
        />
        <Route
          exact
          path="/hr/employee/info/work-experience"
          render={props => <WorkExperience data={this.state.EmpInfo} back={true} />}
        />


      </Router>
    );
  }
  handleEmpInfo = e => {
    console.log("info", e);
    // history.push("/hr/employee/form-edit");
    this.setState({ EmpInfo: e });
    this.setState({ EmpInfoBool: true })
  };
  handleBack = () => {
    console.log("back");
    this.setState({ EmpInfoBool: false })
  };
  handleEmployeeSubmit = event => {
    event.preventDefault();
    // console.log("id", event.target[0].value, event.target[1].value);
    this.setState({ table: false });

    let body = {
      Email: event.target[0].value,
      Password: event.target[1].value,
      Account: event.target[2].value,
      RoleID: event.target[3].value,
      Gender: this.state.addFormGender,
      FirstName: event.target[6].value,
      // MiddleName: event.target[7].value,
      LastName: event.target[7].value,
      DOB: event.target[8].value,
      ContactNo: event.target[9].value,
      EmployeeCode: event.target[10].value,
      DepartmentID: event.target[11].value,
      PositionID: event.target[12].value,
      DateOfJoining: event.target[13].value,
      // TerminateDate: event.target[14].value,
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/api/employee", body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(res => {
        // this.setState({ table: false });

        if (res) {
          // if (res.Email === 'MongoError' && res.code === 11000) {
          //   // Duplicate email
          //   return res.status(422).send({ succes: false, message: 'User already exist!' });
          // }

          // if (res.EmployeeCode === 'MongoError' && res.code === 11000) {
          //   // Duplicate employeeCode
          //   return res.status(422).send({ succes: false, message: 'User already exist!' });
          // }
    
          // Some other error
          // return res.status(422).send(res);
        }
    
        // res.json({
        //   success: true
        // });

        this.setState({ table: true });
      })
      .catch(err => {
        // window.alert('Email is already in use');
        // window.alert('Employee Code is already in use');
      });
  };
  handleAddEmployee = () => {
    this.setState({ table: false });
  };
  handleEditEmployee = e => {
    console.log(e);
    this.setState({ editForm: true });
    this.setState({ editData: e });
    this.setState({ editFormGender: e["Gender"] })
  };
  handleFormClose = () => {
    this.setState({ table: true });
  };
  handleEditFormClose = () => {
    this.setState({ editForm: false });
  };
  handleFormClose = () => {
    this.setState({ table: true });
  };
  handleEmployeeEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    let body = {
      Email: newInfo.target[0].value,
      // Password: newInfo.target[1].value,
      Account: newInfo.target[1].value,
      RoleID: newInfo.target[2].value,
      Gender: this.state.editFormGender,
      FirstName: newInfo.target[5].value,
      // MiddleName: newInfo.target[6].value,
      LastName: newInfo.target[6].value,
      DOB: newInfo.target[7].value,
      ContactNo: newInfo.target[8].value,
      EmployeeCode: newInfo.target[9].value,
      DepartmentID: newInfo.target[10].value,
      PositionID: newInfo.target[11].value,
      DateOfJoining: newInfo.target[12].value
      // TerminateDate: newInfo.target[13].value,
    };
    console.log("update", body);
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/employee/" + info["_id"],
        body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      }
      )
      .then(res => {
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({ editForm: false });
  };
  handleAddFormGenderChange = (e) => {
    // console.log(e.currentTarget.value);
    this.setState({
      addFormGender: e.currentTarget.value
    });

  };
  handleEditFormGenderChange = (e) => {
    // console.log(e.currentTarget.value);
    this.setState({
      editFormGender: e.currentTarget.value
    });

  };
}

export default Employee;

