// ==UserScript==
// @name         YouTube Randoms Among Us
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Plant amoguses into youtube feed
// @author       nny
// @match        https://www.youtube.com/
// @grant        GM_xmlhttpRequest
// @connect      ytstalker.fun
// ==/UserScript==

const VIDEO_TEMPLATE = `
<div id="content" class="style-scope ytd-rich-item-renderer"><ytd-rich-grid-media
		class="style-scope ytd-rich-item-renderer" lockup="true"><!--css-build:shady--><!--css-build:shady-->
		<div id="dismissible" class="style-scope ytd-rich-grid-media">
			<div id="thumbnail" class="style-scope ytd-rich-grid-media"><ytd-thumbnail
					rich-grid-thumbnail="" use-hovered-property="" width="9999"
					class="style-scope ytd-rich-grid-media" size="large"
					loaded=""><!--css-build:shady--><!--css-build:shady--><a id="thumbnail"
						class="yt-simple-endpoint inline-block style-scope ytd-thumbnail"
						aria-hidden="true" tabindex="-1" rel="null"
						href="/watch?v={{YOUTUBE_VIDEO_ID}}">
						<yt-image alt="" ftl-eligible="" notify-on-loaded=""
							notify-on-unloaded="" class="style-scope ytd-thumbnail"><img
								alt=""
								class="yt-core-image yt-core-image--fill-parent-height yt-core-image--fill-parent-width yt-core-image--content-mode-scale-aspect-fill yt-core-image--loaded"
								style="background-color: transparent;"
								src="https://i.ytimg.com/vi/{{YOUTUBE_VIDEO_ID}}/hqdefault.jpg"></yt-image>

						<div id="overlays" class="style-scope ytd-thumbnail">
							<ytd-thumbnail-overlay-time-status-renderer
								class="style-scope ytd-thumbnail" hide-time-status=""
								overlay-style="DEFAULT"><!--css-build:shady--><!--css-build:shady--><ytd-badge-supported-renderer
									is-thumbnail-badge=""
									class="style-scope ytd-thumbnail-overlay-time-status-renderer"
									system-icons="" enable-refresh-web=""
									enable-signature-moments-web=""><!--css-build:shady--><!--css-build:shady--><dom-repeat
										id="repeat" as="badge"
										class="style-scope ytd-badge-supported-renderer"><template
											is="dom-repeat"></template></dom-repeat></ytd-badge-supported-renderer>
							</ytd-thumbnail-overlay-time-status-renderer><ytd-thumbnail-overlay-now-playing-renderer
								class="style-scope ytd-thumbnail"
								now-playing-badge=""><!--css-build:shady--><!--css-build:shady--><span
									id="overlay-text"
									class="style-scope ytd-thumbnail-overlay-now-playing-renderer">Now
									playing</span>
								<ytd-thumbnail-overlay-equalizer
									class="style-scope ytd-thumbnail-overlay-now-playing-renderer"><!--css-build:shady--><!--css-build:shady--><svg
										xmlns="http://www.w3.org/2000/svg"
										id="equalizer" viewBox="0 0 55 95"
										class="style-scope ytd-thumbnail-overlay-equalizer">
										<g
											class="style-scope ytd-thumbnail-overlay-equalizer">
											<rect class="bar style-scope ytd-thumbnail-overlay-equalizer"
												x="0"></rect>
											<rect class="bar style-scope ytd-thumbnail-overlay-equalizer"
												x="20"></rect>
											<rect class="bar style-scope ytd-thumbnail-overlay-equalizer"
												x="40"></rect>
										</g>
									</svg>
								</ytd-thumbnail-overlay-equalizer>
							</ytd-thumbnail-overlay-now-playing-renderer>
						</div>
						<div id="mouseover-overlay" class="style-scope ytd-thumbnail">
						</div>
						<div id="hover-overlays" class="style-scope ytd-thumbnail">
						</div>
					</a>
				</ytd-thumbnail><ytd-playlist-thumbnail is-double-stack="" use-hovered-property=""
					width="9999" class="style-scope ytd-rich-grid-media" thumbnail-size="large"
					enable-web-modern-collections-v2="" size="large"
					hidden=""><!--css-build:shady--><!--css-build:shady--><yt-collections-stack
						class="collections-stack-wiz">
						<div>
							<div class="collections-stack-wiz__collection-stack2" style="">
							</div>
							<div class="collections-stack-wiz__collection-stack1 collections-stack-wiz__collection-stack1--large"
								style=""></div>
						</div>
					</yt-collections-stack>
					<a id="thumbnail" class="yt-simple-endpoint style-scope ytd-playlist-thumbnail"
						tabindex="-1" aria-hidden="true" href="/watch?v={{YOUTUBE_VIDEO_ID}}">
						<div id="playlist-thumbnails"
							class="style-scope ytd-playlist-thumbnail"></div>
						<div id="overlays" class="style-scope ytd-playlist-thumbnail">
							<ytd-thumbnail-overlay-time-status-renderer
								class="style-scope ytd-playlist-thumbnail"
								hide-time-status=""
								overlay-style="DEFAULT"><!--css-build:shady--><!--css-build:shady--><ytd-badge-supported-renderer
									is-thumbnail-badge=""
									class="style-scope ytd-thumbnail-overlay-time-status-renderer"
									system-icons="" enable-refresh-web=""
									enable-signature-moments-web=""><!--css-build:shady--><!--css-build:shady--><dom-repeat
										id="repeat" as="badge"
										class="style-scope ytd-badge-supported-renderer"><template
											is="dom-repeat"></template></dom-repeat></ytd-badge-supported-renderer>
							</ytd-thumbnail-overlay-time-status-renderer><ytd-thumbnail-overlay-now-playing-renderer
								class="style-scope ytd-playlist-thumbnail"
								now-playing-badge=""><!--css-build:shady--><!--css-build:shady--><span
									id="overlay-text"
									class="style-scope ytd-thumbnail-overlay-now-playing-renderer">Now
									playing</span>
								<ytd-thumbnail-overlay-equalizer
									class="style-scope ytd-thumbnail-overlay-now-playing-renderer"><!--css-build:shady--><!--css-build:shady--><svg
										xmlns="http://www.w3.org/2000/svg"
										id="equalizer" viewBox="0 0 55 95"
										class="style-scope ytd-thumbnail-overlay-equalizer">
										<g
											class="style-scope ytd-thumbnail-overlay-equalizer">
											<rect class="bar style-scope ytd-thumbnail-overlay-equalizer"
												x="0"></rect>
											<rect class="bar style-scope ytd-thumbnail-overlay-equalizer"
												x="20"></rect>
											<rect class="bar style-scope ytd-thumbnail-overlay-equalizer"
												x="40"></rect>
										</g>
									</svg>
								</ytd-thumbnail-overlay-equalizer>
							</ytd-thumbnail-overlay-now-playing-renderer>
						</div>
						<div id="hover-overlays" class="style-scope ytd-playlist-thumbnail">
						</div>
					</a>
				</ytd-playlist-thumbnail></div>
			<div id="thumbnail-underlay" class="style-scope ytd-rich-grid-media" hidden=""></div>
			<div id="details" class="style-scope ytd-rich-grid-media">
				<div id="avatar-container" class="yt-simple-endpoint style-scope ytd-rich-grid-media"><a
						id="avatar-link"
						class="yt-simple-endpoint style-scope ytd-rich-grid-media" tabindex="-1"
						title="{{YOUTUBE_VIDEO_CHANNEL_NAME}}" hidden="" href="/@{{YOUTUBE_VIDEO_CHANNEL_ID}}"><yt-img-shadow
							id="avatar" width="48"
							class="style-scope ytd-rich-grid-media no-transition empty"
							style="background-color: transparent;"><!--css-build:shady--><!--css-build:shady--><img
								id="img" draggable="false"
								class="style-scope yt-img-shadow" alt=""
								width="48"></yt-img-shadow></a>
					<div id="decorated-avatar" class="style-scope ytd-rich-grid-media">
						<yt-decorated-avatar-view-model
							class="yt-decorated-avatar-view-model-wiz style-scope ytd-rich-grid-media"><yt-avatar-shape>
								<div class="yt-spec-avatar-shape yt-spec-avatar-shape__button yt-spec-avatar-shape__button--button-medium yt-spec-avatar-shape__button--tappable"
									aria-label="Go to channel" role="button"
									tabindex="0">
									<div
										class="yt-spec-avatar-shape--cairo-refresh">
										<div
											class="yt-spec-avatar-shape--avatar-size-medium">
											<img alt=""
												class="yt-core-image yt-spec-avatar-shape__image yt-core-image--fill-parent-height yt-core-image--fill-parent-width yt-core-image--content-mode-scale-to-fill yt-core-image--loaded"
												src="{{YOUTUBE_VIDEO_CHANNEL_AVATAR}}">
											<div
												class="yt-spec-avatar-shape__image-overlays yt-spec-avatar-shape__image">
											</div>
										</div>
									</div>
								</div>
							</yt-avatar-shape></yt-decorated-avatar-view-model>
					</div>
				</div>
				<div id="meta" class="style-scope ytd-rich-grid-media">
					<h3 class="style-scope ytd-rich-grid-media">
						<a id="video-title-link"
							class="yt-simple-endpoint focus-on-expand style-scope ytd-rich-grid-media"
							aria-label="{{YOUTUBE_VIDEO_TITLE}} by {{YOUTUBE_VIDEO_CHANNEL_NAME}}"
							title="{{YOUTUBE_VIDEO_TITLE}}"
							href="/watch?v={{YOUTUBE_VIDEO_ID}}">
							<a id="video-title" href="/watch?v={{YOUTUBE_VIDEO_ID}}"
								class="style-scope ytd-rich-grid-media"
								style="text-decoration: none;">{{YOUTUBE_VIDEO_TITLE}}</a>
						</a>
					</h3><ytd-video-meta-block class="grid style-scope ytd-rich-grid-media"
						rich-meta=""
						amsterdam-post-mvp=""><!--css-build:shady--><!--css-build:shady-->
						<div id="metadata" class="style-scope ytd-video-meta-block">
							<div id="byline-container"
								class="style-scope ytd-video-meta-block">
								<ytd-channel-name id="channel-name"
									class=" style-scope ytd-video-meta-block style-scope ytd-video-meta-block"><!--css-build:shady--><!--css-build:shady-->
									<div id="container"
										class="style-scope ytd-channel-name">
										<div id="text-container"
											class="style-scope ytd-channel-name">
											<a class="style-scope ytd-channel-name complex-string yt-simple-endpoint style-scope yt-formatted-string"
												spellcheck="false"
												href="/{{YOUTUBE_VIDEO_CHANNEL_ID}}">{{YOUTUBE_VIDEO_CHANNEL_NAME}}</a>
										</div>
									</div>
									<ytd-badge-supported-renderer
										class="style-scope ytd-channel-name"
										system-icons="" enable-refresh-web=""
										enable-signature-moments-web=""><!--css-build:shady--><!--css-build:shady-->
										<div class="badge  badge-style-type-verified style-scope ytd-badge-supported-renderer style-scope ytd-badge-supported-renderer"
											aria-label="Verified"
											role="img"><yt-icon size="16"
												class="style-scope ytd-badge-supported-renderer"><!--css-build:shady--><!--css-build:shady--><span
													class="yt-icon-shape style-scope yt-icon yt-spec-icon-shape">
													<div
														style="width: 100%; height: 100%; display: block; fill: currentcolor;">
														<svg xmlns="http://www.w3.org/2000/svg"
															height="24"
															viewBox="0 0 24 24"
															width="24"
															focusable="false"
															aria-hidden="true"
															style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
															<path
																d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z">
															</path>
														</svg>
													</div>
												</span></yt-icon>
											<p
												class="style-scope ytd-badge-supported-renderer">
											</p><tp-yt-paper-tooltip
												position="top"
												class="style-scope ytd-badge-supported-renderer"
												role="tooltip"
												tabindex="-1"
												aria-label="tooltip"><!--css-build:shady--><!--css-build:shady-->
												<div id="tooltip"
													class="hidden style-scope tp-yt-paper-tooltip"
													style-target="tooltip">
													Verified
												</div>
											</tp-yt-paper-tooltip>
										</div><dom-repeat id="repeat" as="badge"
											class="style-scope ytd-badge-supported-renderer"><template
												is="dom-repeat"></template></dom-repeat>
									</ytd-badge-supported-renderer>
								</ytd-channel-name>
								<div id="separator"
									class="style-scope ytd-video-meta-block">
									•</div>
								<yt-formatted-string id="video-info"
									class="style-scope ytd-video-meta-block"
									is-empty="function(){var e=Ha.apply(0,arguments);a.loggingStatus.currentExternalCall=b;a.loggingStatus.bypassProxyController=!0;var g,k=((g=a.is)!=null?g:a.tagName).toLowerCase();$y(k,b,&quot;PROPERTY_ACCESS_CALL_EXTERNAL&quot;);var m;g=(m=c!=null?c:d[b])==null?void 0:m.call.apply(m,[d].concat(la(e)));a.loggingStatus.currentExternalCall=void 0;a.loggingStatus.bypassProxyController=!1;return g}"
									hidden=""><!--css-build:shady--><!--css-build:shady--><yt-attributed-string
										class="style-scope yt-formatted-string"></yt-attributed-string></yt-formatted-string>
							</div>
							<div id="metadata-line"
								class="style-scope ytd-video-meta-block">

								<ytd-badge-supported-renderer
									class="inline-metadata-badge style-scope ytd-video-meta-block"
									hidden="" system-icons="" enable-refresh-web=""
									enable-signature-moments-web=""><!--css-build:shady--><!--css-build:shady--><dom-repeat
										id="repeat" as="badge"
										class="style-scope ytd-badge-supported-renderer"><template
											is="dom-repeat"></template></dom-repeat></ytd-badge-supported-renderer>
								<div id="separator"
									class="style-scope ytd-video-meta-block"
									hidden="">•</div>

								<span
									class="inline-metadata-item style-scope ytd-video-meta-block">{{YOUTUBE_VIDEO_VIEWS}}
									views</span>

								<span
									class="inline-metadata-item style-scope ytd-video-meta-block">{{YOUTUBE_UPLOADED_DATE}}</span>
								<dom-repeat strip-whitespace=""
									class="style-scope ytd-video-meta-block"><template
										is="dom-repeat"></template></dom-repeat>
							</div>
						</div>
						<div id="additional-metadata-line"
							class="style-scope ytd-video-meta-block">
							<dom-repeat class="style-scope ytd-video-meta-block"><template
									is="dom-repeat"></template></dom-repeat>
						</div>

					</ytd-video-meta-block><ytd-badge-supported-renderer
						class="video-badge style-scope ytd-rich-grid-media" disable-upgrade=""
						hidden=""></ytd-badge-supported-renderer><ytd-badge-supported-renderer
						class="title-badge style-scope ytd-rich-grid-media" disable-upgrade=""
						hidden=""></ytd-badge-supported-renderer><yt-formatted-string
						id="view-more" link-inherit-color=""
						class="style-scope ytd-rich-grid-media"
						is-empty="function(){var e=Ha.apply(0,arguments);a.loggingStatus.currentExternalCall=b;a.loggingStatus.bypassProxyController=!0;var g,k=((g=a.is)!=null?g:a.tagName).toLowerCase();$y(k,b,&quot;PROPERTY_ACCESS_CALL_EXTERNAL&quot;);var m;g=(m=c!=null?c:d[b])==null?void 0:m.call.apply(m,[d].concat(la(e)));a.loggingStatus.currentExternalCall=void 0;a.loggingStatus.bypassProxyController=!1;return g}"
						hidden=""><!--css-build:shady--><!--css-build:shady--><yt-attributed-string
							class="style-scope yt-formatted-string"></yt-attributed-string></yt-formatted-string>
					<div id="buttons" class="style-scope ytd-rich-grid-media"></div>
				</div>
				<div id="menu" class="style-scope ytd-rich-grid-media"><ytd-menu-renderer
						class="style-scope ytd-rich-grid-media" safe-area=""
						menu-active=""><!--css-build:shady--><!--css_build_scope:ytd-menu-renderer--><!--css_build_styles:video.youtube.src.web.polymer.shared.ui.styles.yt_base_styles.yt.base.styles.css.js-->
						<div id="top-level-buttons-computed"
							class="top-level-buttons style-scope ytd-menu-renderer">
						</div>
						<div id="flexible-item-buttons" class="style-scope ytd-menu-renderer">
						</div>
						<yt-icon-button id="button"
							class="dropdown-trigger style-scope ytd-menu-renderer"
							style-target="button" role="button"
							aria-label="yt-icon-button"><!--css-build:shady--><!--css-build:shady--><button
								id="button" class="style-scope yt-icon-button"
								aria-label="Action menu"><yt-icon
									class="style-scope ytd-menu-renderer"><!--css-build:shady--><!--css-build:shady--><span
										class="yt-icon-shape style-scope yt-icon yt-spec-icon-shape">
										<div
											style="width: 100%; height: 100%; display: block; fill: currentcolor;">
											<svg xmlns="http://www.w3.org/2000/svg"
												enable-background="new 0 0 24 24"
												height="24"
												viewBox="0 0 24 24"
												width="24"
												focusable="false"
												aria-hidden="true"
												style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
												<path
													d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z">
												</path>
											</svg>
										</div>
									</span></yt-icon></button><yt-interaction
								id="interaction"
								class="circular style-scope yt-icon-button"><!--css-build:shady--><!--css-build:shady-->
								<div class="stroke style-scope yt-interaction">
								</div>
								<div class="fill style-scope yt-interaction">
								</div>
							</yt-interaction></yt-icon-button><yt-button-shape
							id="button-shape" class="style-scope ytd-menu-renderer"
							disable-upgrade="" hidden=""></yt-button-shape>
					</ytd-menu-renderer></div>
			</div>
			<div id="attached-survey" class="style-scope ytd-rich-grid-media"></div>
		</div>
		<div id="dismissed" class="style-scope ytd-rich-grid-media">
			<div id="dismissed-content" class="style-scope ytd-rich-grid-media"></div>
		</div><yt-interaction id="interaction"
			class="extended style-scope ytd-rich-grid-media"><!--css-build:shady--><!--css-build:shady-->
			<div class="stroke style-scope yt-interaction"></div>
			<div class="fill style-scope yt-interaction"></div>
		</yt-interaction>
	</ytd-rich-grid-media></div>
<yt-interaction id="interaction" class="extended rounded-large style-scope ytd-rich-item-renderer"
	hidden=""><!--css-build:shady--><!--css-build:shady-->
	<div class="stroke style-scope yt-interaction"></div>
	<div class="fill style-scope yt-interaction"></div>
</yt-interaction>
`;

(async function () {
  "use strict";

  // SETTINGS
  const NUMBER_OF_VIDEOS_TO_REPLACE = 3;
  const CHANNEL_ID = "brainfuck.";
  const CHANNEL_NAME = "brainfuck.";
  const CHANNEL_AVATAR =
    "https://yt3.googleusercontent.com/ytc/AIdro_m2CJ41dQNMOt0edcNqrWE1Su5DftG-IaZQdBT4lmQjH8Y=s160-c-k-c0x00ffffff-no-rj";

  const MIN_VIEWS = "50";
  const MAX_VIEWS = "15000";
  const MIN_YEAR = "2011";
  const MAX_YEAR = "2019";
  const EXCLUDE_VERTICAL = true;
  const ONLY_MUSIC = false;

  function gimmeShit(url, options = {}) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: options.method || "GET",
        url: url,
        headers: options.headers || {},
        responseType: "json",
        onload: function (response) {
          if (response.status >= 200 && response.status < 300) {
            resolve(response.response);
          } else {
            reject(new Error(`Request failed with status ${response.status}`));
          }
        },
        onerror: function (error) {
          reject(error);
        },
      });
    });
  }

  async function amogusPlease(
    min_views = 50,
    max_views = 5000,
    min_year = 2009,
    max_year = 2019,
    exclude_vertical = false,
    only_music = false,
  ) {
    let curl = `https://ytstalker.fun/api/videos/random?`;

    if (min_views && max_views) {
      curl += `&views=${min_views}-${max_views}`;
    }

    if (min_year && max_year) {
      curl += `&years=${min_year}-${max_year}`;
    }

    if (exclude_vertical) {
      curl += `&horizonly=${exclude_vertical}`;
    }

    if (only_music) {
      curl += `&category=10`;
    }

    return await gimmeShit(curl, { headers: { visitor: "04213232131" } });
  }

  async function replaceRandomVideos() {
    const container = document.querySelector(
      "#contents.style-scope.ytd-rich-grid-renderer",
    );
    if (!container) {
      console.log("No Container was found.");
      return;
    }

    const items = [
      ...container.querySelectorAll("ytd-rich-item-renderer"),
    ].slice(-20);
    if (items.length === 0) {
      console.log("No videos was found.");
      return;
    }

    // Shuffle
    const indices = Array.from({ length: items.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // No amoguses. Sad :-(
    let amoguses = [];
    // Need more amoguses
    for (
      let i = 0;
      i < Math.min(NUMBER_OF_VIDEOS_TO_REPLACE, items.length);
      i++
    ) {
      amoguses.push(
        await amogusPlease(
          MIN_VIEWS,
          MAX_VIEWS,
          MIN_YEAR,
          MAX_YEAR,
          EXCLUDE_VERTICAL,
          ONLY_MUSIC,
        ),
      );
    }

    // Plant amogus
    //{"video":{"id":"jkZXd-yYmfE","uploaded":1575348453,"title":"meow meow meow","views":678,"vertical":false,"category":10},"reactions":{"cools":0,"trashes":0}}
    for (
      let i = 0;
      i < Math.min(NUMBER_OF_VIDEOS_TO_REPLACE, items.length);
      i++
    ) {
      const itemToReplace = items[indices[i]];
      const amogus = amoguses[i].video;

      const upload_date = new Date(amogus.uploaded * 1000).toLocaleDateString(
        "en-US",
      );

      const random_video = VIDEO_TEMPLATE.replaceAll(
        "{{YOUTUBE_VIDEO_ID}}",
        amogus.id,
      )
        .replaceAll("{{YOUTUBE_VIDEO_CHANNEL_ID}}", CHANNEL_ID)
        .replaceAll("{{YOUTUBE_VIDEO_CHANNEL_NAME}}", CHANNEL_NAME)
        .replaceAll("{{YOUTUBE_VIDEO_CHANNEL_AVATAR}}", CHANNEL_AVATAR)
        .replaceAll("{{YOUTUBE_VIDEO_TITLE}}", amogus.title)
        .replaceAll("{{YOUTUBE_UPLOADED_DATE}}", upload_date)
        .replaceAll("{{YOUTUBE_VIDEO_VIEWS}}", amogus.views);

      itemToReplace.innerHTML = random_video;
    }
  }

  // Create miner
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        // Mine a lot and frequently
        const hasVideoItems = Array.from(mutation.addedNodes).some(
          (node) =>
            node.querySelectorAll &&
            node.querySelectorAll("yt-icon-button").length > 0,
        );

        if (hasVideoItems) {
          // Palevo. Stop mining. NOW
          observer.disconnect();

          // Pretend to work
          replaceRandomVideos();

          console.log("so true");

          // Schedule mining later
          const timeout = NUMBER_OF_VIDEOS_TO_REPLACE * 1000 * 1.5;
          setTimeout(() => {
            startObserving();
          }, timeout);

          break;
        }
      }
    }
  });

  // Start mining
  async function startObserving() {
    const container = document.querySelector(
      "#contents.style-scope.ytd-rich-grid-renderer",
    );
    if (container) {
      observer.observe(container, {
        childList: true,
        subtree: true,
      });
    } else {
      await setTimeout(startObserving, 500);
    }
  }

  startObserving();
})();
