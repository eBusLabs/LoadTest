var url = "";
var cpr = "";
var otp = "";

//casper.options.colorizerType = "Dummy";
//casper.options.logLevel =  "debug";

casper.test.begin('NO BankId Logon', function suite(test) {

    casper.start(url, function() {
        test.assertHttpStatus(200, "Page Loaded Successfully");
    });

    casper.wait(2000, function() {
        this.page.switchToFrame(1);
    });

	casper.waitFor(function check() {
		if (this.exists('.wrp')) {
			var lab = this.getElementInfo('form label');
			if (lab.text === "Fødselsnummer") {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}, function then() {
		test.assertExists('.wrp', "Iframe Switched Successfully")
	}, function timeout() {
		test.done();
	}, 10000);
	
	casper.then(function () {
	    var inputId = "#" + this.getElementAttribute('.wrp input', 'id');
	    this.sendKeys(inputId, cpr, {keepFocus: true});
	    this.sendKeys('button[title="Neste"]', casper.page.event.key.Enter, {keepFocus: true});
	});
	
	casper.waitFor(function check() {
		if (this.exists('.wrp')) {
			var lab = this.getElementInfo('form label');
			if (lab.text === "Engangskode") {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}, function then() {
		test.assertSelectorHasText('form label', 'Engangskode', "CPR entered successfully");
	}, function timeout() {
		test.done();
	}, 10000);
	
	casper.wait(2000, function() {
		img = gallery + "button.png";
		this.capture(img);
	});
    casper.run(function() {
        test.done();
    });
});
