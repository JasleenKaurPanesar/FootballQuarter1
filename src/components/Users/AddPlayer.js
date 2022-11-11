import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import CustomModal from "../UI/CustomModal";
import classes from "./AddPlayer.module.css";
import Firebase from "../Firebase";

const AddPlayer = (props) => {
  const [fields, setFields] = useState({
    firstname: {
      value: "",
      invalid: false,
      validators: ["_isPresent"],
    },
    lastname: {
      value: "",
      invalid: false,
      validators: ["_isPresent"],
    },
    height: {
      value: 150,
      invalid: false,
      validators: ["_isPresent", "isNum"],
    },
    position: {
      value: "",
      invalid: false,
      validators: ["_isPresent"],
    },
  });
  const [positionlist, setPositionlist] = useState([
    "select position",
    "the point guard (PG)",
    "the shooting guard (SG)",
    "the small forward (SF)",
    "the power forward (PF)",
    "the center (C)",
  ]);

  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [playerList, setPlayerList] = useState([]);
  const setAndValidateField = (value, key) => {
    let field = fields[key];
    let validators = field.validators || [];
    let invalid = validators.some((validator) => {
      if (validator == "_isPresent") {
        return !_isPresent(value);
      } else if (validator == "_isNum") return !_isNum(value);
      else {
        console.log("chk");
      }
    });

    return { ...field, value, invalid };
  };

  const fieldChangeHandler = (event, key) => {
    setFields({
      ...fields,
      [key]: setAndValidateField(event.target.value, key),
    });
  };

  const _isPresent = (value) => {
    console.log("kya3",!!value && value !== "")
    return !!value && value !== "";
  };

  const _isNum = (value) => {
    const numericRegex = /^\d*$/;
    const isOnlyNumeric = numericRegex.test(value);
    return isOnlyNumeric;
  };

  const _validateFields = (callback) => {
    let fieldDetails = {};
    let firstInvalidKey = null;
    Object.keys(fields).forEach((key) => {
      let field = fields[key];
      fieldDetails[key] = field = setAndValidateField(field.value, key);
      if (!firstInvalidKey && field.invalid) firstInvalidKey = key;
    });

    setFields(fieldDetails, () => {
      if (firstInvalidKey) {
      } else if (callback) callback();
    });
  };

  function _onClickAdd(event) {
    event.preventDefault();
    _validateFields(() => {
      let data = {
        firstname: fields.firstname.value,
        lastname: fields.lastname.value,
        height: fields.height.value,
        position: fields.position.value,
      };
    });
    console.log("kya2",fields)
    if (
      fields.firstname.value!=='' && !fields.firstname.invalid &&
      fields.lasttname.value!=='' && !fields.lastname.invalid &&
      fields.height.value!=='' && !fields.height.invalid &&
      fields.position.value!=='select position' && !fields.position.invalid
    ) {
      console.log("kya1")
       let data={ firstname: fields.firstname.value,
                  lastname: fields.lastname.value,
                  height: fields.height.value,
                  position: fields.position.value}
      setPlayerList([...playerList,data])
      let playerIndex=playerList.length+1
      addPlayer("player"+playerIndex,data)
      setSuccess(true);

    }
    else{
      console.log("kya")
      setError(true)
      
    }
  }
  const addPlayer = (id,data) => {
    console.log("chk",id,data)
    const db = Firebase.firestore();
    db.collection("playerList14Nov")
      .doc(id)
      .set({
        firstname: data.firstname,
        lastname: data.lastname,
        height: data.height,
        position: data.position,
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  const errorHandler = () => {
    setError(false);
  };
  const succesHandler = () => {
    setSuccess(false);
    setFields({
      firstname: {
        value: "",
        invalid: false,
        validators: ["_isPresent"],
      },
      lastname: {
        value: "",
        invalid: false,
        validators: ["_isPresent"],
      },
      height: {
        value: 150,
        invalid: false,
        validators: ["_isPresent", "isNum"],
      },
      position: {
        value: "",
        invalid: false,
        validators: ["_isPresent"],
      },
    });
  };

  return (
    <div>
      {error && (
        <CustomModal
          title={"Error"}
          message={"All fields are mandatory"}
          onConfirm={errorHandler}
        />
      )}
      {success && <CustomModal
          title={"Success"}
          message={"Player Successfully Added"}
          onConfirm={succesHandler}
        />}
      <Card className={classes.input}>
        <form>
          <div className={classes.divbox}>
            <label className={classes.labelbox}>First Name</label>
            <input
              className={classes.inputbox}
              type="text"
              value={fields.firstname.value}
              onChange={(event) => fieldChangeHandler(event, "firstname")}
            />
          </div>
          {fields.firstname.invalid ? (
            <span  className={classes.errorMessage}>
              This field can not be blank
            </span>
          ) : (
            ""
          )}
          <div className={classes.divbox}>
            <label className={classes.labelbox}>Last Name</label>
            <input
              className={classes.inputbox}
              type="text"
              value={fields.lastname.value}
              onChange={(event) => fieldChangeHandler(event, "lastname")}
            />
          </div>
          {fields.lastname.invalid ? (
            <span  className={classes.errorMessage}>
              This field can not be blank
            </span>
          ) : (
            ""
          )}
          <div className={classes.divbox}>
            <label className={classes.labelbox}>Height (cm)</label>
            <input
               className={classes.inputbox}
              type="number"
              value={fields.height.value}
              min={150}
              onChange={(event) => fieldChangeHandler(event, "height")}
            />
          </div>
          {fields.height.invalid ? (
            <span  className={classes.errorMessage}>
              This field must be a number
            </span>
          ) : (
            ""
          )}
          <div className={classes.divbox}>
            <label className={classes.labelbox}>Position</label>
            <select
              className={classes.selection}
              type="text"
              value={fields.position.value}
              onChange={(event) => fieldChangeHandler(event, "position")}
            >
              {positionlist.map((val) => {
                return <option value={val}>{val}</option>;
              })}
            </select>
          </div>
          {fields.position.invalid ? (
            <span  className={classes.errorMessage}>
              This field can not be blank
            </span>
          ) : (
            ""
          )}
          <br />
          <Button onClick={_onClickAdd}>Add Player</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddPlayer;
