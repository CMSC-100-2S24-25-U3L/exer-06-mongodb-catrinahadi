import express from 'express';

import {
    homepage,
    saveStudent,
    updateStudent,
    removeUser,
    removeAllUser,
    getUserByStdnum,
    getAllMembers,
  } from './controller.js';
  
  const router = express.Router();
  
  router.get('/', homepage);
  router.post('/save-student', saveStudent);
  router.post('/update', updateStudent);
  router.post('/remove-user', removeUser);
  router.post('/remove-all-user', removeAllUser);
  router.get('/user', getUserByStdnum);
  router.get('/members', getAllMembers);

export default router;