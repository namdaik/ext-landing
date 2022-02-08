const onDocumentReady = (callback) => {
  if (document.readyState === "complete") {
    callback();
    return;
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(function (m) {
      if (m.addedNodes && m.addedNodes[0] && m.addedNodes[0].nodeName === "BODY") {
        callback();
        observer.disconnect();
      }
    });
  });
  observer.observe(document.documentElement, { childList: true });
};

const onElementMount = (selector, callback) => {
  const check = (mutation) => {
    const $found = document.querySelector(selector);
    if ($found) return callback($found);
  };

  check();

  const player = document.getElementsByTagName("ytd-player")[0];
  if (!player) return setTimeout(() => onElementMount(selector, callback), 300);

  const observer = new MutationObserver(check);
  observer.observe(player, { childList: true, subtree: true });
};

onDocumentReady(() => {
  onElementMount(".ytp-ad-skip-button.ytp-button", (btn) => btn.click());
  onElementMount(".html5-video-player.ad-showing video", (video) => (video.currentTime = 10000));

  // Block via CSS
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(`.ad-container, .ad-div, .masthead-ad-control, .video-ads, .ytp-ad-progress-list, #ad_creative_3, #footer-ads, #masthead-ad, #player-ads, .ytd-mealbar-promo-renderer,#watch-channel-brand-div, #watch7-sidebar-ads {
    display: none !important;
  }`)
  );
  style.setAttribute("yt-ad-blocker", "true");
  document.head.appendChild(style);

  // Branding
  const branding = setInterval(() => {
    const player = document.getElementById("ytd-player");

    if (player) {
      clearInterval(branding);

      const { name, homepage_url } = chrome.runtime.getManifest();
      const div = document.createElement("div");
      div.style = "padding: 0.5rem 0;text-align: right;font-size: 12px;font-style: italic;";
      div.innerHTML = `${name} - Powered by <a href="${homepage_url}" target="_blank">${homepage_url}</a>`;
      player.appendChild(div);
    }
  }, 1000);
});
