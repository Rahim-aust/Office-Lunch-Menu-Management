import React from 'react';

const Profile = ({ role }) => {
  return (
    <div>
      {role === 'employee' ? (
        <div>
          <h2>Employee Details</h2>
          {/* Render employee details here */}
        </div>
      ) : (
        <div>
          <h2>Admin Details</h2>
          {/* Render admin details here */}
        </div>
      )}
    </div>
  );
};

export default Profile;
