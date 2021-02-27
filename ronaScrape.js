const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
 	 const browser = await puppeteer.launch({headless:false, slowMo:75, defaultViewport:null});
  	const page = await browser.newPage();
  	const dPath = path.resolve(__dirname, "./rona");
  	await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: dPath})
  	await page.goto('https://app-dev.condoworks.co/');
	await page.type('#Email', 'coop.test@condoworks.co');
	await page.type('#Password', 'MyTesting711');
	await page.click('#btnSubmit');
	await page.waitForSelector('.navbar-toggler-icon');
	await page.click('.navbar-toggler-icon');
	await page.waitForSelector('[id^="InvoicesMenuLink"]');
	await page.click('[id^="InvoicesMenuLink"]');
	await page.waitForSelector('[href="/invoices/all"]');
	await page.click('[href="/invoices/all"]');
	await page.waitForSelector('[name="invoices.InvoiceNumber"]');
	await page.type('[name="invoices.InvoiceNumber"]', '123');
	await page.waitForSelector('tr[class="jqgrow ui-row-ltr"]');
  	await page.evaluate(() => {
  		var rows = document.querySelectorAll('tr[class="jqgrow ui-row-ltr"]');
  	var i=0;
  
  	for(i=0; i<rows.length; ++i){
  		if (rows[i].querySelectorAll('[title="123444"]').length >0){
  			rows[i].querySelector('button').setAttribute("hireMePls","true");
  		}
  	}});
  	await page.waitForSelector('[hireMePls="true"]');
  	await page.click('[hireMePls="true"]');
	await page.waitForSelector('[title="Download file"]');
	await page.click('[title="Download file"]');
	console.log(dPath + "\\Invoice file.pdf");
	await page.waitForNavigation();
	await browser.close();
})();