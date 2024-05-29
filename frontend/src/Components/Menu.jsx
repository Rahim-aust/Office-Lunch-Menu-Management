import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
  const [category, setCategory] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/auth/menu')
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Menu List</h3>
      </div>
      <Link to="/dashboard/addmenu" className='btn btn-success'>Add New Menu</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Day Name</th>
              <th>Menu Name</th>
            </tr>
          </thead>
          <tbody>
            {
              category.map((c, index) => (
                <tr key={index}>
                  <td>{c.days}</td>
                  <td>{c.option}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category
