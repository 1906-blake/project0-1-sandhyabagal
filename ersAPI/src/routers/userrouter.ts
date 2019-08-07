import express from 'express';
//import { authMiddleware } from '../middleware/authmiddleware';
import * as userDao from '../daos/sqluserdao';

export const userRouter = express.Router();

/**
 * endpoint 1: find users
 * url: /users
 * method: GET
 * allowed role: finance manager
 */
userRouter.get('', [
 // authMiddleware(1, 2), //can have access
    async (req, res) => {
        const users = await userDao.findAll();
        res.json(users); // sends info to userDao
    }]);

 /**
  * endpoint 2: find users by Id
  * url: /users/:id
  * method: GET
  * allowed role: finance manager or the ID provided matches the ID of thw current user
  */
userRouter.get('/:id',
  // authMiddleware(1, 2),
    async (req, res) => {
        const user = await userDao.findById(+req.params.id);
        res.json(user);
});
  /**
   * endpoint 3: update user
   * url: /users
   * method: PATCH
   * allowed role: admin
   */
userRouter.patch('', 
  // authMiddleware(1), //only admin have access
    async (req, res) => {
      const user = await userDao.updateUser(req.body);
      res.json(user);
  });