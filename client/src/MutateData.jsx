import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const MUTATION_CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      age
    }
  }
`;

const MutateData = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const [createUser, { data }] = useMutation(MUTATION_CREATE_USER, {
    variables: {
      input: {
        name: name,
        username: username,
        age: Number(age),
        nationality,
      },
    },
  });

  //   add refetch

  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/display")}>Display</button>
      <button onClick={() => navigate("/")}>Home</button>
      <div>
        <label>Name:</label>
        <input
          type="text"
          placeholder="John"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>Username:</label>
        <input
          type="text"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label>Age:</label>
        <input
          type="number"
          placeholder="30"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        ></input>
        <label>Nationality:</label>
        <input
          type="text"
          placeholder="CANADA"
          value={nationality}
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
        ></input>
        <button onClick={createUser}>Create User</button>
        {data && <h3>User created successfully</h3>}
      </div>
    </div>
  );
};

export default MutateData;
