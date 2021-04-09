const Express=require("express");
const path=require("path");
const exphbs=require("express-handlebars");
const members=require("./Members");
const logger=require("./middleware/logger");

const app= Express();

// app.get("/",(req,res)=>{
//     res.sendFile(path.join(__dirname,"public","index.html"));
// });

// init middleware 
app.use(logger);

// handlebars middleware
app.engine("handlebars",exphbs({defaultLayout:"main"}));
app.set("view engine","handlebars");


// Homepage view

app.get("/",(req,res)=>{
    res.render("index",{
        title:"Member app",
        members
    });
})

// body parser middleware
app.use(Express.json());
app.use(Express.urlencoded({extended:false}));

// Set a static folder
app.use(Express.static(path.join(__dirname,"public")));

// Members api routes
app.use("/api/members",require("./routes/api/members"));

const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on PORT: ${PORT}`));