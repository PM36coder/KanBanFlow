import { Schema , model }  from "mongoose";

const taskSchema = new Schema({
    title : {type : String, required : true , trim : true},
    description : {type : String , required : true, trim : true},
    status : {type: String, enum : ['todo','in-progress', 'done'], default : "todo"},
    user: {type :Schema.Types.ObjectId, ref : 'User', required : true}
}, { timestamps : true})


export const Task = model('Task', taskSchema)