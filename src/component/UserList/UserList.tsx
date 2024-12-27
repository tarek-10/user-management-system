import React, { useEffect, useState } from "react";
import "./UserList.css";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Loading from "../Loading/Loading.tsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [userId, setUserID] = useState<number|null>(0);
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const toggleUpdateUser = (user: any) => {
    navigate("/dashboard/add-user", { state: { action: "edit", user } });
  };
  const handleShow = (user:any) => {
    setShow(true);
    setUserID(user.id);
    setUser(user);
  };
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://dummyjson.com/users");
      console.log(response?.data?.users);
      setUsers(response?.data?.users);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `https://dummyjson.com/users/${userId}`
      );
      console.log(response);
      handleClose();
      toast.success("Successfully deleted ...!");
    } catch (error) {
      console.log(error);
      toast.error("Deleted Faild ...!");
    }
  };
  const navigateToAddUser = () => {
    navigate("/dashboard/add-user");
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div>
            <div className="userListContentInfo m-2">
              <h3>Users Lists</h3>
              <button
                onClick={navigateToAddUser}
                className="btn btn-warning text-white contentInfoBtn"
              >
                Add New User
              </button>
            </div>
            <hr />
            {/* data view */}
            <div className="tableSrollable">
            <Table striped bordered hover responsive="sm" className="text-center">
            <thead>
                  <tr>
                    <th></th>
                    <th>id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>BirthDate</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <img src={user.image} alt="image" className="w-25 userImageTable" />
                      </td>
                      <td className="align-middle">{user.id}</td>
                      <td className="align-middle">{user.firstName}</td>
                      <td className="align-middle">{user.lastName}</td>
                      <td className="align-middle">{user.email}</td>
                      <td className="align-middle">{user.phone}</td>
                      <td className="align-middle">{user.birthDate}</td>
                      <td className="align-middle">
                        <CiEdit onClick={()=>toggleUpdateUser(user)}  size={30} className="text-warning editIcon" />
                        <MdDelete
                          onClick={() => handleShow(user)}
                          size={30}
                          className="text-warning mx-3 deleteIcon"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    Confirm Deleting {user.firstName}...!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are You Sure You Want To delete {user.firstName}{" "}
                  {user.lastName}!
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={deleteUser}>
                    Yes
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    No
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </>
      )}
    </>
  );
}
