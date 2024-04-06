//Hooks
import React, { useContext, useState } from 'react';

//HTML Components
import {Typography, Card, CardContent, Divider, Button } from '@mui/material';
import { AccountCircle, Delete } from '@mui/icons-material';
import Modal from 'react-modal'

//Components
import Header from '../Header/Header';
import BanUsers from './BanUsers';
import UnbanUsers from './UnbanUsers';
import DeletePosts from './DeletePosts';

//Global Context
import { GlobalContext } from '../../contexts/GlobalContext';

//Router Navigation
import { Navigate } from 'react-router';


//modal style
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '70vh',
    width: '500px',
    overflow: 'scroll',
    minWidth: '20vw'
  },
};

function AdminDashboard() {
  //Global Context
  const { state } = useContext(GlobalContext);

  //Type of modal
  const [modalType, setModalType] = useState(null);

  //is modal open or not
  const [open, setOpen] = useState(false);

  //handles opening of modal
  const openModal = (type) => {
    setModalType(type);
    setOpen(true);
  }

  //handles closing of modal
  const closeModal = () => {
    setOpen(false);
  }

  //different types of modal and html component to render when selected
  const modalContent = {
    'ban': <BanUsers />,
    'unban': <UnbanUsers />,
    'delete-post': <DeletePosts />
  }

  //navigation depending on if admin or not
  if (state.user.admin !== "true") return <Navigate to="/"/>;

  return (
    <div>
      <Header 
        showSearch={false} 
        showChat={false} 
        showNew={false}
        showHomepage={false}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Card sx={{ width: 200, height: 200, margin: '0 10px', borderRadius: '20px' }}>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <AccountCircle sx={{ color: '#73777B', fontSize: '36px', marginRight: '8px' }} />
              <Typography variant="h6" component="div" sx={{ color: '#73777B', fontSize: '16px', lineHeight: '1' }}>
                Users
              </Typography>
            </div>
            <Divider sx={{ marginBottom: '10px', backgroundColor: '#F0F2F5' }} />
            <Button variant="body2" sx={{ fontSize: '12px' }} onClick={() => openModal('ban')}>
              Ban a User
            </Button>
            <Button variant="body2" sx={{ fontSize: '12px' }} onClick={() => openModal('unban')}>
              Unban a User
            </Button>
          </CardContent>
        </Card>
        <Card sx={{ width: 200, height: 200, margin: '0 10px', borderRadius: '20px' }}>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Delete sx={{ color: '#73777B', fontSize: '36px', marginRight: '8px' }} />
              <Typography variant="h6" component="div" sx={{ color: '#73777B', fontSize: '16px', lineHeight: '1' }}>
                Posts
              </Typography>
            </div>
            <Divider sx={{ marginBottom: '10px', backgroundColor: '#F0F2F5' }} />
            <Button variant="body2" sx={{ fontSize: '12px' }} onClick={() => openModal('delete-post')}>
              Delete a Post
            </Button>
          </CardContent>
        </Card>
      </div>

      <Modal isOpen={open} style={customStyles} onRequestClose={closeModal} ariaHideApp={false}>
          {modalType && modalContent[modalType]}
      </Modal>
    </div>
  );
}

export default AdminDashboard;
