import React, { useEffect, useState } from "react";
import Firebase from "../Firebase";
import Button from "../UI/Button";
import Card from "../UI/Card";
import CustomModal from "../UI/CustomModal";

import classes from "./UsersList.module.css";

const UsersList = () => {
  const [players, setPlayers] = useState({});
  const [changeDetails, setChangeDetails] = useState([]);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [positionlist, setPositionlist] = useState([
    "select position",
    "the point guard (PG)",
    "the shooting guard (SG)",
    "the small forward (SF)",
    "the power forward (PF)",
    "the center (C)",
  ]);
  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const response = Firebase.firestore().collection("playerList12Nov");
    const data = await response.get();
    let playerList = {};

    data.docs.forEach((item) => {
      playerList = { ...playerList, [item.id]: item.data() };
    });
    console.log("abc", playerList);
    setPlayers(playerList);
  };
  const editUserList = (id) => {
    const db = Firebase.firestore();
    db.collection("playerList12Nov")
      .doc(id)
      .set({
        firstname: players[id].firstname,
        lastname: players[id].lastname,
        height: players[id].height,
        position: players[id].position,
      })
      .then(function () {
        console.log("Document successfully written!");
        setSuccess(true);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  const save = () => {
    const { player1, player2, player3, player4 } = players;
    if (
      player1.position == player2.position ||
      player1.position == player3.position ||
      player2.position == player3.position ||
      player2.position == player4.position ||
      player3.position == player4.position ||
      player4.position == player1.position
    ) {
      setError(true);
    } else {
      console.log("fire");
     console.log("change", changeDetails);
      changeDetails.forEach((item) => {
        editUserList(item);
      });

      // saveToFirebase.collection("Quarter").add({
      //   firstname: players.firstname.value,
      //   lastname: players.lastname.value,
      //   height: players.height.value,
      //   position: players.position.value,
      // });
    }
  };
  const errorHandler = () => {
    setError(false);
  };
  const successHandler = () => {
    setSuccess(false);
  };
  return (
    <div>
      {error && (
        <CustomModal
          title={"Error"}
          message={"position can not be duplicate"}
          onConfirm={errorHandler}
        />
      )}
      {success && (
        <CustomModal
          title={"Success"}
          message={"positions updated successfully"}
          onConfirm={successHandler}
        />
      )}

      <Card className={classes.input}>
        {Object.keys(players).map((key, index) => {
          return (
            <div style={{ display: "flex" }}>
              <input
                style={{ flex: "0.5", margin: "0.5%" }}
                type="text"
                value={players[key].firstname + " " + players[key].lastname}
              ></input>

              <select
                style={{ flex: "0.5", margin: "0.5%" }}
                type="text"
                value={players[key].position}
                onChange={(event) => {
                  if (players[key].position !== event.target.value) {
                    setChangeDetails([...changeDetails, key]);
                  }
                  //players updated
                  const newuser = {
                    ...players[key],
                    position: event.target.value,
                  };

                  setPlayers({ ...players, [key]: newuser });
                }}
              >
                {positionlist
                  .filter((position) => position)
                  .map((val) => {
                    return <option value={val}>{val}</option>;
                  })}
              </select>

              <br />
            </div>
          );
        })}
        <Button onClick={save}>Add User</Button>
      </Card>
    </div>
  );
};

export default UsersList;
