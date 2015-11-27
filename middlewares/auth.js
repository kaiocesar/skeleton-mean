/**
 * Created by Admin on 11/22/15
 * #REFACTOR
 */

module.exports = function(req, res, next){
    if (req.isAuthenticated()){

        next();
        //if (req.url == '/profile'){
        //    var user = req.user;
        //    var area = user.acl.role;
        //    console.log(area);
        //    //res.redirect('/'+area+'/profile');
        //} else {
        //    next();
        //}

    } else {
        res.redirect('/login');
    }
};