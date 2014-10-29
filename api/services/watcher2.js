var request = require("request");
var moment = require("moment");

var api_id = process.env.STATUS_IO_API_ID;
var api_key = process.env.STATUS_IO_API_KEY;
var status = "544e810996cc7fe45400896c";
var metric = "544e86d396cc7fe4540089f2";

var data = {
    "statuspage_id": "544e810996cc7fe45400896c",
    "metric_id":  "544e86d396cc7fe4540089f2",
    "day_avg": "22.58",
    "day_start": "1395981878000",
    "day_dates": [],
    "day_values": [],
    "week_avg": "20.07",
    "week_start": "1395463478000",
    "week_dates": ["2014-03-22T04:43:00+00:00","2014-03-23T04:43:00+00:00","2014-03-24T04:43:00+00:00","2014-03-25T04:43:00+00:00","2014-03-26T04:43:00+00:00","2014-03-27T04:43:00+00:00","2014-03-28T04:43:00+00:00"],
    "week_values": ["23.10","22.10","22.20","22.30","22.10","18.70","17.00"],
    "month_avg": "10.63",
    "month_start": "1393476280000",
    "month_dates": ["2014-02-28T04:43:00+00:00","2014-03-01T04:43:00+00:00","2014-03-02T04:43:00+00:00","2014-03-03T04:43:00+00:00","2014-03-04T04:43:00+00:00","2014-03-05T04:43:00+00:00","2014-03-06T04:43:00+00:00","2014-03-07T04:43:00+00:00","2014-03-08T04:43:00+00:00","2014-03-09T04:43:00+00:00","2014-03-10T04:43:00+00:00","2014-03-11T04:43:00+00:00","2014-03-12T04:43:00+00:00","2014-03-13T04:43:00+00:00","2014-03-14T04:43:00+00:00","2014-03-15T04:43:00+00:00","2014-03-16T04:43:00+00:00","2014-03-17T04:43:00+00:00","2014-03-18T04:43:00+00:00","2014-03-19T04:43:00+00:00","2014-03-20T04:43:00+00:00","2014-03-21T04:43:00+00:00","2014-03-22T04:43:00+00:00","2014-03-23T04:43:00+00:00","2014-03-24T04:43:00+00:00","2014-03-25T04:43:00+00:00","2014-03-26T04:43:00+00:00","2014-03-27T04:43:00+00:00","2014-03-28T04:43:00+00:00"],
    "month_values": ["0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","18.50","18.60","18.40","16.60","16.80","17.90","19.90","21.30","22.80","20.00","17.30","19.10","21.50","22.40","22.50","22.00","21.80"]
}

var day_dates = ["2014-03-28T05:43:00+00:00","2014-03-28T06:43:00+00:00","2014-03-28T07:43:00+00:00","2014-03-28T08:43:00+00:00","2014-03-28T09:43:00+00:00","2014-03-28T10:43:00+00:00","2014-03-28T11:43:00+00:00","2014-03-28T12:43:00+00:00","2014-03-28T13:43:00+00:00","2014-03-28T14:43:00+00:00","2014-03-28T15:43:00+00:00","2014-03-28T16:43:00+00:00","2014-03-28T17:43:00+00:00","2014-03-28T18:43:00+00:00","2014-03-28T19:43:00+00:00","2014-03-28T20:43:00+00:00","2014-03-28T21:43:00+00:00","2014-03-28T22:43:00+00:00","2014-03-28T23:43:00+00:00","2014-03-29T00:43:00+00:00","2014-03-29T01:43:00+00:00","2014-03-29T02:43:00+00:00","2014-03-29T03:43:00+00:00"];
var day_values = ["20.70","20.00","19.20","19.80","19.90","20.10","21.40","23.00","27.40","28.70","27.50","29.30","28.50","27.20","28.60","28.70","25.90","23.40","22.40","21.40","19.80","19.50","20.00"];
var index = 0;

var temp_values = [];
var time_values = [];


var randomizeData = function(){
    var newVal;// generate nuber between 15-30
    var timestamp = moment().utc();
    var yesterday = moment().utc().subtract(24, 'hour');

    data.day_start = yesterday.unix()*1000;

    temp_values.push((Math.random() *15 + 15).toString());
    time_values.push(timestamp);

    for(var i = 0; i < 23; i++){
        newVal = Math.random() *15 + 15 ;// generate nuber between 15-30
        timestamp.subtract(1, 'hour').format();

        temp_values.push(newVal.toString());
        time_values.push(timestamp);
    }



}



var sendData = function(){
    //var day_dates_slice = day_dates.slice(0, index);
    //var day_values_slice = day_values.slice(0, index);
    randomizeData();

    //data.day_dates = day_dates_slice;
    data.day_dates = time_values;

    //data.day_values = day_values_slice;
    data.day_values = temp_values;

    request({
        url: "https://private-39405-statusio.apiary-proxy.com/v2/metric/update",
        body: JSON.stringify(data),
        headers: {"x-api-id": api_id, "x-api-key": api_key, "Content-Type": "application/json"},
        method: "POST"
    }, function (error, response, body) {
        console.log("Status", response.statusCode);
        console.log("Headers", JSON.stringify(response.headers));
        console.log("Response received", body);

        index++;
        //if(index < day_dates.length) {
            //setTimeout(sendData, 1000);
        //}
    });
}

module.exports = {
    watch: function() {
        sendData();
    }
}