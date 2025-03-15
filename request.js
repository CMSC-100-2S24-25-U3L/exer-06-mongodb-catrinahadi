import needle from 'needle';

needle.post('http://localhost:3000/save-student', {
    stdnum: "1010",
    fname: "Elizabeth",
    lname: "Windsor",
    age: 98
}, (err, res) =>{
    console.log(res.body)
});

needle.post('http://localhost:3000/update', {
    fname: "Mary Jane"
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
