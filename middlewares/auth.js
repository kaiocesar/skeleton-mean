/**
 * Created by Admin on 11/22/15.
 */

module.exports = function(req, res, next){
    if (req.isAuthenticated()){
        res.send('ok');
        //next();
    } else {
        res.redirect('/login');
        //res.status(401).end();
    }
};