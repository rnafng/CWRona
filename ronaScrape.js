// Rona Fang, Feb 26 2021

// ronaSrape.js uses puppeteer to navigate through condoworks.co
// to search and download an invoice 


const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
	
 	const browser = await puppeteer.launch({headless:false, slowMo:75, defaultViewport:null});
  	const page = await browser.newPage();
  	const dPath = path.resolve(__dirname, "./rona");
  	await page.setDefaultNavigationTimeout(0); // no timeout limit
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
	await page.waitForSelector('[title="123444"]');

  	await page.evaluate(() => {
  	var rows = document.querySelectorAll('tr[class="jqgrow ui-row-ltr"]'); // rows of invoices
	  	var i=0;
	  	for(i=0; i<rows.length; ++i){
	  		if (rows[i].querySelectorAll('[title="123444"]').length >0){ 
	  			// if the row has Invoice#123444
	  			rows[i].querySelector('button').setAttribute("pls","hireMe"); 
	  			// set an attribute to refer to outside of eval()
	  		}	
  		}
  	});

  	await page.waitForSelector('[pls="hireMe"]');
  	await page.click('[pls="hireMe"]');
	await page.waitForSelector('[title="Download file"]');
	await page.click('[title="Download file"]');


	console.log("Downloaded @ \n");
	console.log(dPath + "\\Invoice file.pdf");
	
})();
 