export function displayErrorNotification(title: string, message: string) {
  const existing = document.getElementById("flow-error-notification")
  if (existing) {
    existing.remove()
  }

  const container = document.createElement("div")
  container.id = "flow-error-notification"
  document.body.appendChild(container)

  const shadow = container.attachShadow({mode: "closed"})

  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  const backgroundColor = isDarkMode ? "#2c2c2c" : "#ffffff"
  const textColor = isDarkMode ? "#f0f0f0" : "#333333"
  const borderColor = isDarkMode ? "#444444" : "#e0e0e0"

  const style = document.createElement("style")
  style.textContent = `
    :host {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 320px;
      overflow: hidden;
    }
    .notification {
      background-color: ${backgroundColor};
      color: ${textColor};
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-family: Arial, sans-serif;
      border: 1px solid ${borderColor};
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .title {
      font-weight: bold;
      margin-bottom: 8px;
      font-size: 16px;
    }
    .message {
      font-size: 14px;
      line-height: 1.4;
    }
  `
  shadow.appendChild(style)

  const notification = document.createElement("div")
  notification.classList.add("notification")

  const titleElem = document.createElement("div")
  titleElem.classList.add("title")
  titleElem.innerText = title
  notification.appendChild(titleElem)

  const messageElem = document.createElement("div")
  messageElem.classList.add("message")
  messageElem.innerText = message
  notification.appendChild(messageElem)

  shadow.appendChild(notification)

  // Trigger the fade-in animation
  requestAnimationFrame(() => {
    notification.style.opacity = "1"
    notification.style.transform = "translateY(0)"
  })

  setTimeout(() => {
    notification.style.opacity = "0"
    notification.style.transform = "translateY(20px)"
    notification.addEventListener("transitionend", () => container.remove())
  }, 5000)
}
