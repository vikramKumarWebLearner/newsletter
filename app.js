//jshint esversion: 6

const express =require("express");
const bodyParser =require("body-parser");
const request = require("request");
const http =require("http");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req, res)=>{
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req,res)=>{
  const  fName=req.body.fName;
  const  lName=req.body.lName;
  const email=req.body.email;

  const data={
    members:[
      {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:fName,
        LNAME:lName
      }
    }
  ]
  };


const jsonData = JSON.stringify(data);
const url="http://us12.api.mailchimp.com/3.0/lists/17b54b0d65";

const options={
  method:"POST",
  auth:"vikram:92a7edc986225f6007e31570b82214ac-us12"
};

const request = http.request(url,options,(response)=>{
  //console.log(response.statusCode);
  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html");
  }else{
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname + "/failure.html");
    }
  }
  // response.on("data", (data)=>{
  //    console.log(JSON.parse(data));
  // });
});


request.write(jsonData);
request.end();
});

app.post("/failure", (req,res)=>{
  res.redirect("/");
});






app.listen(process.env.PORT || 3000, ()=>{
  console.log("Server is running on port 3000");
});
