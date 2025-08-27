import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
// import client from '../graphql/apollo-client';

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export default function DeleteUserPage() {
  const [id, setId] = useState('');
  // const [deleteUser, { data, loading, error }] = useMutation(DELETE_USER, { client });
  const [deleteUser, { data, loading, error }] = useMutation(DELETE_USER);

  const handleDelete = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await deleteUser({ variables: { id: Number(id) } });
    } catch (error) {

    }
  };

  return (
    <form onSubmit={handleDelete}>
      <h1>Delete User</h1>
      <input placeholder="User ID" value={id} onChange={(e) => setId(e.target.value)} />
      <button type="submit" disabled={loading}>Delete</button>
      {data?.deleteUser && <p>User deleted</p>}
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
