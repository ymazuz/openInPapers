// Register for the validate and command events.
safari.application.addEventListener("validate", performValidate, false);
safari.application.addEventListener("command", performCommand, false);
safari.application.addEventListener("message", handleMessage, false);


// In the global page, the only events to listen for 
// are toolbar or context menu events. This determines which it was.
function performCommand(event)
{	
	thisTab = safari.application.activeBrowserWindow.activeTab;
	theSelection = "";
	
	
	if (event.command == "openLinkInPapers") 
	// from the "Open Link in Papers" context menu event...
	{
		theUrl = event.userInfo.href; // pass the href as the URL
		theTitle = event.userInfo.selection; // and the link text as the title
	} 
	else // otherwise it's "open in Papers" from toolbar or context menu
	{
		// so url and title come from the current page
		theUrl = thisTab.url;
		theTitle = thisTab.title;
		
		// if it was the context menu, we can get the selection
		// TO-DO (ysm): figure out if we can get a selection 
		// at the time of toolbar click
		if (event.userInfo != undefined) 
		{
			theSelection = event.userInfo.selection;	
		}	
	}			
	
	// send the url, title, and selection to the open in function
	openURLinPapers(theUrl, theTitle, theSelection);
}


function openURLinPapers(url, title, selection)
{
	papersUrl = 'papers://url/'+encodeURIComponent(url)+'&title='+encodeURIComponent(title);
	
	// if selection is not empty, append it, too
	if (selection) 
	{	
		papersUrl = papersUrl + '&selectedText=' + encodeURIComponent(selection);		
	} 	
	// (ysm: I'm not sure "&selectedText=" has any effect. 
	// It's in the Papers bookmarklet, though.)
	
	// The end of the line: open the "papers://" url
	safari.application.activeBrowserWindow.activeTab.url = papersUrl;
}


function handleMessage(event)
{
	// TO-DO (ysm): figure out how to get selected text into here 
	// (and if it actually matters to Papers)
	console.log(event.name);
    console.log(event.message);
    
    if (event.name == 'openInPapersViaKeyboardShortcut')
    {
    	activeTab = safari.application.activeBrowserWindow.activeTab;
        if (activeTab.url) openURLinPapers(activeTab.url, activeTab.title, "");
    }

}





	
function performValidate(event)
 {	
	if (!safari.application.activeBrowserWindow.activeTab.url) {
		event.target.disabled = true;
	} else {
		switch (event.command) {
 			case "openInPapersToolbar":
 				// as long as there's a URL, the toolbar item is enabled
 				event.target.disabled = false;
 				break;
 				
 			// the other events we can validate are context menu ones	
 			case "openInPapersMenu":
 				// the regular "Open in Papers" is available unless the user right-clicked a link
 				event.target.disabled = event.userInfo.hasLink;
				break;
				
			case "openLinkInPapers":
				// "Open Link in Papers" only if they did right-click a link
				event.target.disabled = !event.userInfo.hasLink; 
 		} 
 	}
 	
}