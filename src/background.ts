import { GaBuilder } from "./models/ga";

var gaBuilder = new GaBuilder();

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(
  (info) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0 || !tabs[0].id) {
        return;
      } else {
        const ga = gaBuilder.createFromUrl(info.request.url);
        chrome.tabs.sendMessage(tabs[0].id, ga);
      }
    });
  }
);
