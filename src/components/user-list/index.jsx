import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./style.css";
import { MdDelete } from "react-icons/md";
import { responseMessage } from "../../utils/response-message";
import { getUsersList } from "../../services/methods";
import { imageDownload } from "../../utils/common-function";

const data = [
  { name: "Celo", email: "celo@gmail.com", ph: "234324432342" },
  { name: "Celo", email: "celo@gmail.com", ph: "234324432342" },
  { name: "Celo", email: "celo@gmail.com", ph: "234324432342" },
  { name: "Celo", email: "celo@gmail.com", ph: "234324432342" },
  { name: "Celo", email: "celo@gmail.com", ph: "234324432342" },
];

const UserList = () => {
  const [list, setList] = useState([]);
  console.log("🚀 ~ file: index.jsx:18 ~ UserList ~ list:", list);

  const getList = async () => {
    try {
      const response = await getUsersList();
      setList(response.data.response_data);
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:21 ~ getList ~ err:", err);
      responseMessage(err.data.code);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <h3 className="mb-5">User List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>created At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((obj, index) => {
            return (
              <tr key={`lst_${obj._id}`}>
                <td>{index + 1}</td>
                <td>{obj.name}</td>
                <td>{obj.email}</td>
                <td>{obj.phone_number}</td>
                <td>{obj.createdAt}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    type="button"
                    onClick={() => imageDownload(obj.user_image.secure_url)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
