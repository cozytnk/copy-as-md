

chrome.browserAction.onClicked.addListener(tab => {

  // [javascript - How to get Clipboard data in Chrome Extension? - Stack Overflow](https://stackoverflow.com/questions/22702446/how-to-get-clipboard-data-in-chrome-extension)
  // [javascript - Copy to Clipboard in Chrome Extension - Stack Overflow](https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension/18455088#18455088)

  const copyTextToClipboard = text => {
    const elem = document.createElement("textarea")

    elem.textContent = text

    document.body.appendChild(elem)

    elem.select()

    document.execCommand('copy')

    // (Optional) De-select the text using blur().
    elem.blur()

    document.body.removeChild(elem)
  }

  copyTextToClipboard(`[${tab.title}](${tab.url})`)
})

