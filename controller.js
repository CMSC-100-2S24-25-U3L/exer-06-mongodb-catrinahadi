import mongoose from 'mongoose';

await mongoose.connect("mongodb://127.0.0.1:27017/StudentDatabase", {
    useNewUrlParser: true, useUnifiedTopology: true
});
const Student = mongoose.model("Student", {
    stdnum: String,
    fname: String,
    lname: String,
    age: Number 
}, 'studentData');

const homepage = (req, res) => {
    res.send("Welcome to Homepage!");
};

const saveStudent = async (req, res) => {
    if (req.body.stdnum && req.body.fname && req.body.lname && req.body.age) {
        const newStudent = new Student(req.body);
        try {
            await newStudent.save();
            res.json({ success: true });
        } catch (err) {
            console.error('Error saving student:', err);
            res.json({ success: false });
        }
    } else {
        res.json({ success: false });
    }
};
