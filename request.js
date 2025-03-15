import needle from 'needle';

needle.post('http://localhost:3000/save-student', {
    stdnum: "1010",
    fname: "Mary Jane",
    lname: "Watson",
    age: 23
}, (err, res) =>{
    console.log(res.body)
});

needle.post('http://localhost:3000/update', {
    fname: "Mary Jane",
    newFname: "Mary Jane", //
    newLname: "Parker"
}, (err, res) => {
    console.log(res.body);
});

needle.post('http://localhost:3000/remove-user', {
    stdnum: "1010"
}, (err, res) => {
    console.log(res.body);
});

needle.post('http://localhost:3000/remove-all-user', {}, (err, res) => {
    console.log(res.body);
});

needle.get('http://localhost:3000/members', (err, res) =>{
   console.log(res.body)
})

needle.get(`http://localhost:3000/user?stdnum='1005'`, (err, res) => {
   console.log(res.body)
})
