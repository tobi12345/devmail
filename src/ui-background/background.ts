chrome.runtime.onStartup.addListener(() => {
	console.log("onStartup")
})

chrome.runtime.onConnect.addListener(() => {
	console.log("onConnect")
})

chrome.runtime.onInstalled.addListener(function () {
	console.log("hi")
})
