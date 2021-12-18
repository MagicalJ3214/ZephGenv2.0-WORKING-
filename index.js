const {default: axios} = require("axios");
const fs = require("fs");
const playwright = require("playwright");

(async  function() {
    while (true) {
        await sleep(await GenerateToken("Proxyless"));
    }
})();

function GenerateToken(Proxy) {
    return new Promise(async function(resolve) {
        console.log("-- + [MODIFIED ZEPHGEN] +--");
        console.log("     [Ver:2.0] ");
	console.log("");
        console.log("-- + [GENINFO]  +--");
        console.log(" STARTED! ");
        const PBrowser = await playwright.firefox.launch({headless: false});
        const PContext = await PBrowser.newContext();
        const PPage = await PContext.newPage();
        var startTime = Date.now();
        try {
            try {
                await PPage.goto("https://discord.com/", {"timeout": 60000, "waitUntil": "networkidle"});
            }
            catch {
                console.log(" BAD! ");
                throw false;
            }
            await PPage.click("#app-mount > div > div > div.grid-3Ykf_K.heroBackground-3m0TRU > div.row-3wW-Fx.heroContainer-3j1eQg > div > div.ctaContainer-3vWJHU > button");
            await sleep(1000);
			await PPage.click("#app-mount > div > div > div.grid-3Ykf_K.heroBackground-3m0TRU > div.row-3wW-Fx.heroContainer-3j1eQg > div.heroBody-3b6R3c > div.formContainer-1p5okg > div.termsContainer-f1Cj9m > div.container-23gjzD.brandLight-5gl2MR.termsCheckbox-1vN0hh > div.checkbox-1iCVPU");
			await sleep(1000)
			await PPage.type("input.username-27KRPU", Math.random().toString(36).substring(2, 7) + "\n");
            await PPage.waitForSelector("iframe");
            console.log(" CAPTCHA DETECTED!");
            startTime = Date.now();
            await sleep(3000);
            await PPage.click("iframe");
            var email = Math.random().toString(36).substring(2, 12);
            await axios.post("https://api.internal.temp-mail.io/api/v3/email/new", {"domain": "kjkszpjcompany.com", "name": email});
            email += "@kjkszpjcompany.com";
            await sleep(1000);
            await PPage.waitForSelector("#react-select-2-input");
            console.log(" CAPTCHA SOLVED!");
            await PPage.type("#react-select-2-input", "January\n");
            await PPage.type("#react-select-3-input", "1\n");
            await PPage.type("#react-select-4-input", "1994\n\n");
            await PPage.waitForSelector("button.close-hZ94c6");
            await PPage.click("button.close-hZ94c6");
            await sleep(1000);
            await PPage.waitForSelector("input[type='text']");
            await PPage.type("input[type='text']", email);
            await PPage.type("input[type='password']", "qpwo12!@\n");
            var emailData;
            while (true) {
                var emailData = await axios.get("https://api.internal.temp-mail.io/api/v3/email/" + email + "/messages").then(res => res.data);
                if (emailData.length !== 0) {
                    emailData = emailData[0].body_text.split("Verify Email: ")[1].trim();
                    break;
                }
                await sleep(1000);
            }
            await PPage.goto(emailData);
            await PPage.waitForSelector("h3.title-jXR8lp");
            while (await PPage.innerText("h3.title-jXR8lp") !== "Email Verified!") {
                try {
                    await PPage.waitForSelector("iframe", {"timeout": 3000});
                    await PPage.click("iframe");
                }
                catch {}
                await sleep(1000);
            }
            console.log(" ACCOUNT VERIFIED!");
            var Token = await PPage.evaluate(function() {
                var iframe = document.createElement("iframe");
                document.head.append(iframe);
                return iframe.contentWindow.localStorage.getItem("token").replace(/"/g, "");
            });
            fs.appendFileSync("./Tokens.txt", Token + "\n");
	    fs.appendFileSync("./combo.txt", email + ":qpwo12!@" +  "\n");
            console.log(" TOKEN/COMBO SAVED | " + Buffer.from(Token.split(".")[0], "base64").toString() + " | ");
            await PBrowser.close();
            console.log(" PLEASE WAIT...!");
        }
        catch {
            console.error(" ERROR!");
            await PBrowser.close();
        }
        resolve(startTime + 121000 - Date.now());
    });
}

function sleep(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}