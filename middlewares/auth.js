/**
 * Created by Admin on 11/22/15
 * #REFACTOR
 */

module.exports = function(req, res, next){
    if (req.isAuthenticated()){

        next();
        //if (req.url == '/profile'){
        //    var user = req.user;
        //    //console.log(Object.prototype.toString.call(req.session.user));
        //    //console.log(req.user.acl);
        //    //var area = user.acl.role;
        //    //console.log(area);
        //    //res.redirect('/'+area+'/profile');
        //} else {
        //    next();
        //}

    } else {
        res.redirect('/login');
    }
};