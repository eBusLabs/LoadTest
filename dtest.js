var url = "";
var cpr = "";
var otp = "";

//casper.options.colorizerType = "Dummy";

casper.test.begin('NO BankId Logon', 3, function suite(test) {

    casper.start(url, function() {
        test.assertHttpStatus(200, "Page Loaded Successfully");
				test.assertTitle("Freaky Friday!", "Title is OK");
    });

    casper.wait(2000, function() {
        this.page.switchToFrame(1);
    });

    casper.waitFor(function check() {
        if (this.exists('.wrp')) return true;
        else return false;
    }, function then() {
				test.assertExists('.wrp', "Iframe Switched Successfully")
		}, function timeout() {
				test.done();
		}, 10000);

    casper.run(function() {
        test.done();
    });
});
