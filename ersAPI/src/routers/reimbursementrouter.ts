import express from 'express';
import { authMiddleware } from '../middleware/authmiddleware';
import * as reimbursementDao from '../daos/sqlreimbursementdao';

export const reimbursementRouter = express.Router();

/**
 * endpoint 1: find reimbursements by status
 * url: /reimbursements/status/:statusId
 * method: GET
 * allowed role: finance manager
 */
reimbursementRouter.get('/status/:statusid', [
   //authMiddleware('Admin', 'Finance Manager'), //can have access
    async (req, res) => {
        let statusid = req.params.statusId;
        const reimbursements = await reimbursementDao.findReimbursementByStatusId(statusid);
        res.json(reimbursements); // sends info to userDao
    }]);

 /**
  * endpoint 2: find reimbursements by user
  * url: /reimbursements/author/userid/:userid
  * method: GET
  * allowed role: finance manager or if ther userId is the user making the request.
  */
reimbursementRouter.get('/author/userid/:userid', [
    authMiddleware('Admin','Finance Manager'),
    async (req, res) => {
        let userid = req.params.userid;
        const reimbursement = await reimbursementDao.findReimbursementByAuthor(userid);
        res.json(reimbursement);
}]);
  /**
   * endpoint 3: Submit reimbursement
   * url: /reimbursements
   * method: POST
   * allowed role: reimbursementid should be 0
   */
reimbursementRouter.post('', [
   authMiddleware('Admin'),
    async (req, res) => {
        let userid = req.body;
        const user = await reimbursementDao.createReimbursement(userid);
        res.json(user);
  }]);
 /**
   * endpoint 4: update reimbursement
   * url: /reimbursements
   * method: PATCH
   * allowed role: finance manager
   */
  reimbursementRouter.patch('', [
    authMiddleware('Admin'),
    async (req, res) => {
        const reimbursement = req.body;
        const reimbursementUpdate = await reimbursementDao.updateReimbursement(reimbursement);
        res.json(reimbursementUpdate);
  }]);