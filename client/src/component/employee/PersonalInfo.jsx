import React, { Component } from "react";
import "./PersonalInfo.css";
import axios from "axios";
import PersonalInfoTable from "./PersonalInfoTable.jsx";
import PersonalInfoFormEdit from "./PersonalInfoFormEdit.jsx";
class PersonalInfo extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {},
    addFormGender: "",
    editFormGender: ""
  };

  render() {
    return (
      <React.Fragment>

        {this.state.table ? (
          this.state.editForm ? (
            <PersonalInfoFormEdit
              onPersonalInfoEditUpdate={this.handlePersonalInfoEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
              onGenderChange={this.handleEditFormGenderChange}
            />
          ) : (
              <PersonalInfoTable
                onAddPersonalInfo={this.handleAddPersonalInfo}
                onEditPersonalInfo={this.handleEditPersonalInfo}
                data={this.props.data}
                back={this.props.back}
              />
            )
        ) : (
            <div />
          )}
      </React.Fragment>
    );
  }
  handleEditPersonalInfo = e => {
    console.log(e);
    this.setState({ editForm: true });
    this.setState({ editData: e });
    this.setState({ editFormGender: e["Gender"] });
  };
  handleEditFormClose = () => {
    this.setState({ editForm: false });
  };
  handlePersonalInfoEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", newInfo.target[0].value);
    let body = {
      Gender: this.state.editFormGender,
      ContactNo: newInfo.target[4].value,
      EmergencyContactNo: newInfo.target[5].value,
      Email: newInfo.target[6].value,
      // PANcardNo: newInfo.target[6].value,
      DOB: newInfo.target[7].value,
      BloodGroup: newInfo.target[8].value,
      Hobbies: newInfo.target[9].value,
      PresentAddress: newInfo.target[10].value,
      PermanetAddress: newInfo.target[11].value
    };
    console.log("update", body);
    axios
      .put(process.env.REACT_APP_API_URL + "/api/personal-info/" + info["_id"], body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(res => {
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({ editForm: false });
  };
  handleEditFormGenderChange = e => {
    // console.log(e.currentTarget.value);
    this.setState({
      editFormGender: e.currentTarget.value
    });
  };
}

export default PersonalInfo;
