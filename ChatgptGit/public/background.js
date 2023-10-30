/*global chrome*/
console.log("background working");

const linkedInListViewURL="https://www.linkedin.com/jobs/collections";
const linkedInDetailedViewURL="https://www.linkedin.com/jobs/view";

function getJobDescriptionclassName(url){
    console.log("url", url);   
    return url.startsWith(linkedInListViewURL)?
    "jobs-search__job-details--container"
    :"jobs-description-content__text";
}

function grabJobDescription(className){ 
    console.log("className", className);   
    const jobDetailsContainer = document.body.querySelector(`.${className}`);
    const jobDetails = jobDetailsContainer.textContent;
    const cleanedJobDetails = jobDetails.replace(/\s\s+/g, " ");
    console.log("cleanedJobDetails", cleanedJobDetails);
    return cleanedJobDetails;
}

chrome.tabs.onUpdated.addListener(function (tabId,changeInfo,tab){    
if(changeInfo.status === "complete" && tab.active){
    
    if(tab.url?.startsWith(linkedInListViewURL) || 
      tab.url?.startsWith(linkedInDetailedViewURL)){
               
        chrome.scripting.executeScript({
            target:{tabId: tabId},
            func:grabJobDescription,
            args:[getJobDescriptionclassName(tab.url)],
        })
        .then((queryResult) =>{            
            chrome.storage.local.set({jobDescription: queryResult[0].result});
        });
      }
}
});