const clipboard = {
  writeText: async text => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: text => {
        const el = document.createElement('textarea')
        el.textContent = text
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        el.blur()
        document.body.removeChild(el)
        return
      },
      args: [text]
    })
  }
}


chrome.action.onClicked.addListener(async tab => {
  console.log('@action.onClicked', tab)

  const setBadgeTextThenRemove = async (text, ms) => {
    await chrome.action.setBadgeText({ tabId: tab.id, text })
    setTimeout(() => {
      chrome.action.setBadgeText({ tabId: tab.id, text: '' })
    }, ms)
  }

  try {
    let text = decodeURIComponent(`[${tab.title}](${tab.url})`)
    await clipboard.writeText(text)
    setBadgeTextThenRemove('ok!', 2000)
  } catch (error) {
    setBadgeTextThenRemove('ng', 2000)
    console.error(error)
  }

})

