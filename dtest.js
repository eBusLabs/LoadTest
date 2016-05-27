var jquery = "/mnt/data/codlin/eworkspace/neon-python/LearnCasper/libs/libs/jquery/jquery-2.2.1.min.js";
var gallery = "/mnt/data/codlin/eworkspace/neon-python/LearnCasper/gallery/";
var url = "";
var cpr = "";
var otp = "";

//casper.options.colorizerType = "Dummy";

casper.test.begin("Load BankId Page", 1, function(test) {
	casper.start(url, function() {
        test.assertHttpStatus(200, "Page Loaded Successfully");
    }).run(function() {
        test.done();
    });
});

casper.wait(2000, function() {
    this.page.switchToFrame(1);
});

casper.waitFor(function check() {
	if (this.exists('.wrp')) {
        return true;
    } else {
    	return false;
    }
}, function then() {	
	//test will handle 
}, function timeout() {
    //test will handle
},10000);

casper.test.begin("Switch to Iframe", 1, function(test) {
    test.assertExists('.wrp', "Iframe Switched Successfully");
    test.done();
});
