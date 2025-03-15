import mongoose from 'mongoose';

// connect to the mongodb database named "StudentDatabase"
await mongoose.connect("mongodb://localhost:27017/StudentDatabase", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

// define the student model
const Student = mongoose.model("Student", {
    stdnum: String,  
    fname: String,  
    lname: String,   
    age: Number     
}, 'studentData');  

// homepage route - simple response
const homepage = (req, res) => {
    res.send("welcome to homepage!");
};

// save a new student record in the database
const saveStudent = async (req, res) => {
    // check if all required fields are provided
    if (req.body.stdnum && req.body.fname && req.body.lname && req.body.age) {
        const newStudent = new Student(req.body);
        try {
            await newStudent.save();  // save student to the database
            res.json({ success: true });
        } catch (err) {
            console.error('error saving student:', err);
            res.json({ success: false });
        }
    } else {
        res.json({ success: false }); // missing required fields
    }
};

// update the last name of a student named "mary jane"
const updateStudent = async (req, res) => {
    const { fname } = req.body;
    if (fname === 'Mary Jane') {
        try {
            await Student.updateOne({ fname: 'Mary Jane' }, { lname: 'Parker' });
            res.json({ updated: true });
        } catch (err) {
            console.error('error updating student:', err);
            res.json({ updated: false });
        }
    } else {
        res.json({ updated: false, message: 'student not found' });
    }
};

// remove a student based on their student number
const removeUser = async (req, res) => {
    const { stdnum } = req.body;
    if (stdnum) {
        try {
            await Student.deleteOne({ stdnum });
            res.json({ deleted: true });
        } catch (err) {
            console.error('error removing user:', err);
            res.json({ deleted: false });
        }
    } else {
        res.json({ deleted: false, message: 'invalid request' });
    }
};

// remove all students from the database
const removeAllUser = async (req, res) => {
    try {
        await Student.deleteMany();
        res.json({ deleted: true });
    } catch (err) {
        console.error('error removing all users:', err);
        res.json({ deleted: false });
    }
};

// retrieve a student by student number
const getUserByStdnum = async (req, res) => {
    const { stdnum } = req.query;
    if (stdnum) {
        try {
            const user = await Student.find({ stdnum });
            res.json(user);
        } catch (err) {
            console.error('error fetching user by stdnum:', err);
            res.json([]);
        }
    } else {
        res.json([]); // no stdnum provided
    }
};

// retrieve all students from the database
const getAllMembers = async (req, res) => {
    try {
        const members = await Student.find();
        res.json(members);
    } catch (err) {
        console.error('error fetching all members:', err);
        res.json([]);
    }
};

// export functions for use in other files
export {
  homepage,
  saveStudent,
  updateStudent,
  removeUser,
  removeAllUser,
  getUserByStdnum,
  getAllMembers,
};
