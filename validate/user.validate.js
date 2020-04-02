module.exports.createUser = (req, res, next) => {
    const errors = [];
    if(!req.body.name){
        errors.push('Name is required');
    }
    if(!req.body.email){
        errors.push('Email is required');
    }
    if(!req.body.phone){
        errors.push('Phone is required');
    }
    if(!req.body.password){
        errors.push('Password is required');
    }
    if(errors.length){
        res.render('users/create', {
            errors: errors,
            values: req.body
        });
        return;
    }
    next();
};