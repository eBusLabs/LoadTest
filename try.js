console.log("starting testing....");
//global variables
var url = "";

var jquery = "C:/Users/bb6625/home/pworkspace/PhantomDemo/libs/jquery/jquery-2.2.1.min.js";
var gallery = "C:/Users/bb6625/home/pworkspace/PhantomDemo/gallery/";
var cpr = "";
var otp = "";

var casper = require('casper').create({
	clientScripts:[
	   jquery,                                 // These two scripts will be injected in remote
	],
    pageSettings: {
        loadImages:  true,                      // The WebPage instance used by Casper will
        loadPlugins: true                       // use these settings
    },
    logLevel: "debug",                           // Only "info" level messages will be logged
    verbose: true                                // log messages will be printed out to the console
});

//at the beginning of the script
casper.on("remote.message", function(msg){
    this.echo(msg);
});

casper.start(url, function() {
	//this.echo(this.status(true));
	//display evaluate console.log on console
	var res = this.status(false);
	if (res.currentHTTPStatus === 200 ) {
		this.echo("page loaded successfully...");
	} else {
		this.echo("Unable to load page....");
		this.echo("HTTP Status : " + res.currentHTTPStatus);
		this.exit();
	}
});

casper.wait(2000, function() {
    this.page.switchToFrame(1);
    this.echo(this.getCurrentUrl(), 'INFO'); 
});

casper.waitFor(function check() {
	if (this.exists('.wrp')) {
        return true;
    } else {
    	return false;
    }
}, function then() {    // step to execute when check() is ok	
	console.log("iframe loaded..");
}, function timeout() { // step to execute if check has failed
    this.echo("iframe not loaded in 10 seconds....exiting now").exit();
},10000); //timeout

casper.then(function () {
	this.echo(this.getHTML('form label'));
    var inputId = "#" + this.getElementAttribute('.wrp input', 'id');
    this.echo(inputId);
    this.sendKeys(inputId, cpr);
    img = gallery + "cpr.png";
	this.capture(img);
});

casper.then(function() {
	console.log(this.getHTML(".button_icon_wrapper"));
	this.page.injectJs(jquery);
	this.page.evaluate(function() {
    	try {
    		var j = $("button")[0].click();
    		console.log("J>>>>" + j);
    		$("button")[0].click();
    	} catch (err) {
    		console.log("Exception occur " + err);
    		phantom.exit();
    	}
	});
	console.log(this.getHTML(".form_wrapper"));
	console.log(this.getHTML(".button_icon_wrapper"));
});

casper.wait(10000, function() {
	img = gallery + "button.png";
	this.capture(img);
	console.log(this.getHTML(".button_icon_wrapper"));
});

casper.on('error', function(msg, backtrace) {
	console.log(msg);
	img = gallery + "error.png";
	this.capture(img);
	this.exit();
});

casper.run();
