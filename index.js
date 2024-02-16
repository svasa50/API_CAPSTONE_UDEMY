import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app=express();
const port =5501;
const API_URL="https://v6.exchangerate-api.com/v6/8a405cd8bae8745d8306e47f/";
const API_KEY="8a405cd8bae8745d8306e47f";
// const parameters="pair/USD/INR/10000"
// GET https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP//

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.render("index.ejs",{
        result:"", rate:"", to:"",
    });
});
app.post("/convert", async (req,res)=>{
    const input = req.body;    const from = (input.fromCurrency);
    const to = (input.toCurrency);    const amount = (input.amount);
    const parameters=`pair/${from}/${to}/${amount}`;
    // console.log(API_URL + parameters);
    const content=await axios.get(API_URL+parameters);
    const result = (content.data);
    console.log(result);
     res.render("index.ejs",{
        resultAmount:result.conversion_result, rate:result.conversion_rate, 
        to:to, amount:amount, from:from,
        year:(new Date().getFullYear()),
    });
});

app.listen(port,()=>{
    console.log(`server listening on port: ${port}`)
});