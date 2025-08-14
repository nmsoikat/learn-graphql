import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      email
    }
  }
`;

export default function UpdateUserPage() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({ variables: { input: { id: Number(id), name, email } } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update User</h1>
      <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <input placeholder="New Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="New Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit" disabled={loading}>Update</button>
      {data && <p>User updated: {data.updateUser.name}</p>}
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
