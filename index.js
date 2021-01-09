const express=require('express');
const mongoose=require("mongoose");
const cors=require('cors');
const bodyParser=require('body-parser');
const resultRouter=require("./routes/resultRouter");
const BatchRouter=require("./routes/emailsRouter");
const timeRouter=require("./routes/timeTableRouter");
const adminRouter=require("./routes/adminRouter");
const credRouter=require("./routes/credRouter");
const AttendenceRouter=require("./routes/attendenceRouter");
const postRouter=require("./routes/postRouter");
const studentRouter=require("./routes/studentRouter");
const authRouter=require("./routes/authRouter");
const instructorRouter=require("./routes/instructorRouter");
const posterRouter=require("./routes/posterRouter");
const fileUpload=require('express-fileupload')
const app=express();
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.get('/', (req,res) => {
    res.send('Welcome to AwareBot!!');
})

const port=process.env.PORT || 5000;

mongoose.connect("mongodb+srv://AwareBot:AwareBot.123@cluster0.na6cy.mongodb.net/AwareBot?retryWrites=true&w=majority",
{ useNewUrlParser: true,
    useUnifiedTopology: true,
     useFindAndModify: false },()=>{
    // console.log("Connected to DB");
});
app.use('/instructor', express.static('controller/images/instructor'));
app.use('/poster', express.static('controller/images/poster'));
app.use('/result',resultRouter);
app.use('/attendence',AttendenceRouter);
app.use('/timetable',timeRouter);
app.use('/student',studentRouter);
app.use('/admin',adminRouter);
app.use('/post',postRouter);
app.use('/creds',credRouter);
app.use('/batch',BatchRouter);
app.use('/auth',authRouter);
app.use('/instructor',instructorRouter);
app.use('/poster',posterRouter);
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(port,()=>{
    // console.log("Server connected successfully on port "+port);
});