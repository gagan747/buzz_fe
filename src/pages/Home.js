/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import FriendsContext from '../components/FriendsContext';

const userContext = createContext();
export { userContext };

function Home() {
  const { jwtoken } = useParams();
  const [user, setUser] = useState({ profile_img: '', is_Admin: 'notLoaded', user_id: '' });
  const update = (profile_img, is_Admin, user_id) => {
    setUser({ profile_img, is_Admin, user_id });
  };
  useEffect(() => {
    if (jwtoken) {
      localStorage.setItem('x-auth-token', jwtoken);
    }
  }, []);
  return (
    <userContext.Provider value={{ user, update }}>
      <Navbar />
      <Feed>
        <FriendsContext />
      </Feed>
    </userContext.Provider>
  );
}

export default Home;
