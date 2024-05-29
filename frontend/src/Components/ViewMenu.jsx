import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewMenu = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/employee/viewmenu', { withCredentials: true })
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.error("Axios error:", err.message));
  }, []);

  return (
    <div className='px-5 mt-3'>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Day Name</th>
              <th>Menu Name</th>
            </tr>
          </thead>
          <tbody>
            {category.map((c, index) => (
              <tr key={index}>
                <td>{c.days}</td>
                <td>{c.option}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewMenu;
