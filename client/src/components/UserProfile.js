import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/users/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setUser(data);
      });
  }, [id]);


  if (!user) {
    return <div>Loading...</div>;
  }

  const { username, email, location, bio } = user;

  return (
    <div>
      <div>
        <h1>User Profile</h1>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Location: {location}</p>
        <p>Bio: {bio}</p>
      </div>
    </div>
  );
}

export default UserProfile;