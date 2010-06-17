window.addEventListener('keydown', checkKeyDown, false);
window.addEventListener('keyup', checkKeyUp, false);
document.addEventListener("contextmenu", getContextMenuEvent, false);


function checkKeyDown(event)
{
    // <ctrl> key press
    if (event.keyCode == 17)
    {
		safari.self.tab.dispatchMessage('ctrlStatusUpdate', true);
	}
	// <p> key press
	else if(event.keyCode == 80)
	{
	    safari.self.tab.dispatchMessage("openInPapersViaKeyboardShortcut", true);
    }
    else
    {
        safari.self.tab.dispatchMessage('ctrlStatusUpdate', false);
    }
}

function checkKeyUp(event)
{
    // <ctrl> key release
	if(event.keyCode == 17)
	{
		safari.self.tab.dispatchMessage('ctrlStatusUpdate', false);
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

