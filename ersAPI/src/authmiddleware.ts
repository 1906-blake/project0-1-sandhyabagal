/**
 * 
 * @param role 
 */

export const authMiddleware = (...role) => (req, res, next) => {
    if (req.session.user) {
        console.log('current user = ', req.session.user.roleid); //setting the authMiddleware role restriction to the numeric roleid values
        if (role.includes(req.session.user.roleid)) {
            const userId = req.body.id;
            const currentLoggedInUser = req.session.user;
           if (role.includes(req.session.user.roleid) || (currentLoggedInUser.id === userId)) {
               next();
           }
        } else {
            // 403 means forbidden which means we know who they are, they just don't have the right access
            res.status(403);
            res.send('Permission Denied');
        }
    } else {
        // 401 is Unauthorized which really means Unauthenticated
        // they don't have access because we don't know who they are
        res.sendStatus(401);
    }
};