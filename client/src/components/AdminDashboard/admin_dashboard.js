import React from 'react';
import {Typography, Card, CardContent, Divider } from '@mui/material';
import { AccountCircle, Delete } from '@mui/icons-material';
import Header from '../header/Header';


function SquareCard() {
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
            <Typography variant="body2" sx={{ fontSize: '12px' }}>
              Add a User
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '12px' }}>
              Delete a User
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: 200, height: 200, margin: '0 10px', borderRadius: '20px' }}>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Delete sx={{ color: '#73777B', fontSize: '36px', marginRight: '8px' }} />
              <Typography variant="h6" component="div" sx={{ color: '#73777B', fontSize: '16px', lineHeight: '1' }}>
                Ads
              </Typography>
            </div>
            <Divider sx={{ marginBottom: '10px', backgroundColor: '#F0F2F5' }} />
            <Typography variant="body2" sx={{ fontSize: '12px' }}>
              Delete an Ad
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SquareCard;
