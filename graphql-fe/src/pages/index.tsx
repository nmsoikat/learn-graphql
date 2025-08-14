import { gql, useQuery } from '@apollo/client';
import { User } from '../types/User';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/router';
import { deleteUserById, getUsers } from '../redux/slices/user-slice';

// const GET_USERS = gql`
//   query {
//     users {
//       id
//       name
//       email
//     }
//   }
// `;

export default function Home() {
  // const { data, loading, error } = useQuery(GET_USERS);

  const dispatch = useAppDispatch();
  const token = useAppSelector((store) => store.auth.token);
  const { users, error, loading } = useAppSelector((store) => store.users);
  const router = useRouter()

  useEffect(() => {
    if (!token) router.push('/signin');
  }, [token, router]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = (id: string | number) => {
    dispatch(deleteUserById(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul style={{ listStyle: 'number' }}>
        {users.map((user: User, i) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleDelete(user.id)} style={{ marginLeft: 10 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
