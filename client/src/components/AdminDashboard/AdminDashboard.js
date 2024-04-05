import React, { useContext, useState } from 'react';
import {Typography, Card, CardContent, Divider, Button } from '@mui/material';
import { AccountCircle, Delete } from '@mui/icons-material';
import Header from '../Header/Header';
import { GlobalContext } from '../../contexts/GlobalContext';
import { Navigate } from 'react-router';
import Modal from 'react-modal'
import BanUsers from './BanUsers';
import UnbanUsers from './UnbanUsers';
import DeletePosts from './DeletePosts';

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
  const { state } = useContext(GlobalContext);
  const [modalType, setModalType] = useState(null);
  const [open, setOpen] = useState(false);

  const openModal = (type) => {
    setModalType(type);
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
  }

  const modalContent = {
    'ban': <BanUsers />,
    'unban': <UnbanUsers />,
    'delete-post': <DeletePosts />
  }

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
