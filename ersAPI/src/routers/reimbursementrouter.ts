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
   authMiddleware(1, 2), //can have access
    async (req, res) => {
        let statusid = req.params.statusid;
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
   authMiddleware(1, 2),
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
reimbursementRouter.post('', 
   authMiddleware(1),
    async (req, res) => { // creating a reimbursement
        console.log("Created Post");
        const create = await reimbursementDao.createReimbursement(req.body);
        res.json(create);
  });
 /**
   * endpoint 4: update reimbursement
   * url: /reimbursements
   * method: PATCH
   * allowed role: finance manager
   */
  reimbursementRouter.patch('', // updating reimbursement
   authMiddleware(1,2),
    async (req, res) => {
        console.log("Updated reimbursement");
        const reimbursement = req.body;
        const reimbursementUpdate = await reimbursementDao.updateReimbursement(reimbursement);
        res.json(reimbursementUpdate);
  });