/**
 * Created by Emiliya Vuntsova on 4/19/17.
 */
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAVGAUK9OibrKsyCCmr-3-StlYy2dj-1oM",
    authDomain: "bidapp-41608.firebaseapp.com",
    databaseURL: "https://bidapp-41608.firebaseio.com",
    projectId: "bidapp-41608",
    storageBucket: "bidapp-41608.appspot.com",
    messagingSenderId: "7704568181"
};
firebase.initializeApp(config);

//Creating a variable to reference the database
var database = firebase.database();
//Initial variables

var initialBid = 0;
var initialBidder = "";

var highPrice = initialBid;
var highBidder = initialBidder;

//Listener
database.ref().on("value", function (snapshot) {
if(snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()){
    highBidder = snapshot.val().highBidder;
    highPrice = snapshot.val().highPrice;

    $("#highestBidder").html(highBidder);
    $("#highestPrice").html("$"+highPrice);
}else {
    $("#highestBidder").html(highBidder);
    $("#highestPrice").html("$"+highPrice);
}
});

//Whenever a user clicks the submit button
$("#submitBid").on("click", function () {
    var bidderName = $("#bidderName").val().trim();
    var bidderPrice = $("#bidderPrice").val().trim();

    //check in the console if it works
    console.log(bidderName);
    console.log(bidderPrice);

    if(bidderPrice > highPrice){
        alert("You are The Highest Bidder!");
        database.ref().set({
            highBidder: bidderName,
            highPrice: bidderPrice
        })
    }else {
        alert("You have to bit higher!")
    }
    return false;
});
