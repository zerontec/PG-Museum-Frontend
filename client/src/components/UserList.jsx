import React, { useState, useEffect} from 'react'
import Swal from 'sweetalert2'
import { Modal, Button, List, Avatar, Skeleton } from 'antd';
import { getAllGallery } from '../redux/actions/galleryActions'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.min.css'
import { RiFlashlightFill } from 'react-icons/ri'
const url = process.env.REACT_APP_URL;

const UserList = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState()
  const [ok, setOk] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${url}/user/all`)
      .then(data => data.json())
      .then(result => setState(result))
    dispatch(getAllGallery())
  }, [isModalVisible, ok])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAdmin = { roles: ["admin"] }

  const userToAdmin = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Convert to Admin'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${url}/user/put/${id}`, {
          method: 'PUT',
          body: JSON.stringify(handleAdmin),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(data => data.json())
          .then(result => result ?
            Swal.fire(
              'User converted!',
              `${result.message}`,
              'success'
            ).then(result => setOk(id)) :
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })

          )
      }
    })

  }

  const deleteUser = (id) => {
    fetch(`${url}/user/delete/${id}`, {
      method: 'DELETE'
    })
      .then(data => data.json())
      .then(result => result ?
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            ).then(result => setOk(id))
          }
        }) :
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      )
  }

  return (
    <div>
      <Button onClick={showModal} type="link" icon={<RiFlashlightFill style={{ fontSize: '24px' }} />} danger />
      <Modal title="Users List" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={state?.data?.filter(admin => admin?.username !== 'admin')}
          renderItem={item => (
            <List.Item
              actions={[
                <>
                  <Button key="list-loadmore-edit" type="link" danger onClick={() => deleteUser(item.id)}>Delete</Button>
                  <Button key="list-loadmore-more" type="link" onClick={() => userToAdmin(item.id)}>Convert admin</Button>
                  <Link to={"/resetPasswordPost"}
                    state={{ email: item.email, status: true }}
                  >Reset password</Link>
                </>
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={<label>{item.name}</label>}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}

export default UserList;