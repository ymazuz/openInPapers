window.addEventListener('keydown', checkKeyDown, false);
document.addEventListener("contextmenu", getContextMenuEvent, false);


function checkKeyDown(event)
{
    // <ctrl-p> key press
    if (event.keyCode == 80 & event.ctrlKey)
    {
		safari.self.tab.dispatchMessage("openInPapersViaKeyboardShortcut", true);
	}
}


function getContextMenuEvent(event) {
	
	selection = event.view.document.getSelection() + ""; // get page selection as string 
	selection = selection.replace(/^\s+|\s+$/g,""); // strip leading and trailing whitespace

	// don't need to pass messages, since the global script can see this event
	// we can just add a userInfo object to it. 
	var userInfo = new Object();

	// the userInfo object's properties:
	// hasLink: does the right-click target have an HREF attribute?
	userInfo.hasLink = !(typeof event.target.href == "undefined"); 
	
	// selection: the selected text or the link text, depending on click target
	userInfo.selection =  userInfo.hasLink ? event.target.innerText : selection;
	
	// href: the link URL if there is one
	userInfo.href = userInfo.hasLink ? event.target.href : "";
    
	// add userInfo to the event so it'll be seen by the validate function 
	safari.self.tab.setContextMenuEventUserInfo(event, userInfo);
}

