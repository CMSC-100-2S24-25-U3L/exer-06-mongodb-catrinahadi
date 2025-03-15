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

const updateStudent = async (req, res) => {
    const { fname } = req.body;
    if (fname === 'Mary Jane') {
        try {
            await Student.updateOne({ fname: 'Mary Jane' }, { lname: 'Parker' });
            res.json({ updated: true });
        } catch (err) {
            console.error('Error updating student:', err);
            res.json({ updated: false });
        }
    } else {
        res.json({ updated: false, message: 'Student not found' });
    }
};

const removeUser = async (req, res) => {
    const { stdnum } = req.body;
    if (stdnum) {
        try {
            await Student.deleteOne({ stdnum });
            res.json({ deleted: true });
        } catch (err) {
            console.error('Error removing user:', err);
            res.json({ deleted: false });
        }
    } else {
        res.json({ deleted: false, message: 'Invalid request' });
    }
};

const removeAllUser = async (req, res) => {
    try {
        await Student.deleteMany();
        res.json({ deleted: true });
    } catch (err) {
        console.error('Error removing all users:', err);
        res.json({ deleted: false });
    }
};

const getUserByStdnum = async (req, res) => {
    const { stdnum } = req.query;
    if (stdnum) {
        try {
            const user = await Student.find({ stdnum });
            res.json(user);
        } catch (err) {
            console.error('Error fetching user by stdnum:', err);
            res.json([]);
        }
    } else {
        res.json([]);
    }
};

const getAllMembers = async (req, res) => {
    try {
        const members = await Student.find();
        res.json(members);
    } catch (err) {
        console.error('Error fetching all members:', err);
        res.json([]);
    }
};

export {
  homepage,
  saveStudent,
  updateStudent,
  removeUser,
  removeAllUser,
  getUserByStdnum,
  getAllMembers,
};