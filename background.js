

chrome.browserAction.setBadgeBackgroundColor({ color: '#444' })


chrome.browserAction.onClicked.addListener(tab => {

  // [javascript - How to get Clipboard data in Chrome Extension? - Stack Overflow](https://stackoverflow.com/questions/22702446/how-to-get-clipboard-data-in-chrome-extension)
  // [javascript - Copy to Clipboard in Chrome Extension - Stack Overflow](https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension/18455088#18455088)

  const copyTextToClipboard = text => {
    const elem = document.createElement('textarea')
    elem.textContent = text
    document.body.appendChild(elem)
    elem.select()
    document.execCommand('copy')
    elem.blur() // (Optional) De-select the text using blur().
    document.body.removeChild(elem)
  }

  const setBadgeTextThenRemove = (text, ms) => {
    chrome.browserAction.setBadgeText({ text }, () => {
      setTimeout(() => {
        chrome.browserAction.setBadgeText({ text: '' })
      }, ms || 3000)
    })
  }

  try {
    copyTextToClipboard(`[${tab.title}](${tab.url})`)
    setBadgeTextThenRemove('ok!', 2000)
  } catch {
    setBadgeTextThenRemove('ng...', 2000)
  }
})

