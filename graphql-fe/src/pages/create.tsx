import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export default function CreateUserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  //  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, { client });
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({ variables: { input: { name, email } } });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create User</h1>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit" disabled={loading}>Create</button>
      {data && <p>User created: {data.createUser.name}</p>}
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
