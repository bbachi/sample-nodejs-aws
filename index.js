const express = require('express');
const AWS = require('aws-sdk');


const app = express();
const port = 3090

// Create an S3 client
var s3 = new AWS.S3();

app.get('/', (req, res) => {
    res.send(`App Workss!!!!`);
})

app.get('/bucket/:bucketName', (req,res) => {
    
    const params = {Bucket: req.params.bucketName}
    s3.createBucket(params, (err, data) => {
        if (err) { 
            console.log(err, err.stack);
            res.json({'error': err.stack});
        }
        else res.json(data);
    });
})

app.get('/buckets', (req, res) => {
    s3.listBuckets(function(err, data) {
        if (err) {
            console.log(err, err.stack);
            res.json({'error': err.stack});
        }
        else res.json(data);
    });
})

app.listen(port, () => {
    console.log(`server listening on the port   ${port}`)
})