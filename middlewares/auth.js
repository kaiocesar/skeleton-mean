/**
 * Created by Admin on 11/22/15.
 */

module.exports = function(req, res, next){
    if (req.user){
        next();
    } else {
        res.status(401).end();
    }
};