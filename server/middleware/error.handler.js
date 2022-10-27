import ErrorModel from "../models/error.model.js";

export default function errorHanler(err, req, res, next){
    if(err instanceof Error){
        res.status(err.status || 500).send(err.message);
        return;
    }
    if(err instanceof ErrorModel){
        res.status(err.status).send(err.message);
        return;
    }
    
    next();
}

