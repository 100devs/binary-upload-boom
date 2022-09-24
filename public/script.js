let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

updateMode()
darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
window.addEventListener('storage', updateModeWithoutTransitions)

function updateMode() {
	let isSystemDarkMode = darkModeMediaQuery.matches
	let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

	if (isDarkMode) {
		document.documentElement.classList.add('dark')
	} else {
		document.documentElement.classList.remove('dark')
	}

	if (isDarkMode === isSystemDarkMode) {
		delete window.localStorage.isDarkMode
	}
}

function disableTransitionsTemporarily() {
	document.documentElement.classList.add('[&_*]:!transition-none')
	window.setTimeout(() => {
		document.documentElement.classList.remove('[&_*]:!transition-none')
	}, 0)
}

function updateModeWithoutTransitions() {
	disableTransitionsTemporarily()
	updateMode()
}

document.getElementById('toggleMode').addEventListener('click', toggleMode)

function toggleMode() {
	disableTransitionsTemporarily()

	let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
	let isSystemDarkMode = darkModeMediaQuery.matches
	let isDarkMode = document.documentElement.classList.toggle('dark')

	if (isDarkMode === isSystemDarkMode) {
		delete window.localStorage.isDarkMode
	} else {
		window.localStorage.isDarkMode = isDarkMode
	}
}

/*///////////////////////////
/// Like and Delete
//////////////////////////*/

async function likePost(post) {
	try {
		const response = await fetch(`/post/like/${post}`, {
			method: 'put',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				id: post
			})
		})
		const data = await response.json()
		location.reload()
	} catch (error) {
		console.log(error)
	}
}

async function deletePost(post){
	try {
		const response = await fetch(`/post/${post}`, {
			method: 'delete',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				id: post
			})
		})
		const data = await response.json()
		document.getElementById('closeDeleteModal').click()
		location.replace('/profile')
	} catch (err) {
		console.error(err)
	}
}

/*///////////////////////////
/// Back to top
//////////////////////////*/
 
/**
 * The link that triggers the
 * back to top behaviour.
 * @type {HTMLElement}
 */
 const backToTopButton = document.querySelector('[data-js-hook="back-to-top-button"]');

 /**
  * A list of all focusable elements
  * on the page.
  * @type {NodeList}
  */
 const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
 
 /**
  * The options used in the native
  * scrollTo method.
  * @type {Object}
  */
 const scrollOptions = {
   top: 0,
   left: 0,
   behavior: 'smooth'
 };
 
 /**
  * Whether the device supports
  * smooth scroll, or not.
  * @type {Boolean}
  */
 const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
 
 /**
  * Handles moving the user back to the
  * top of the document.
  * @param event the event object passed in when
  * clicking on the button / link.
  */
 function moveToTop(event) {
   event.preventDefault();
 
   // Scroll to top.
   supportsNativeSmoothScroll ? window.scrollTo(scrollOptions) : window.scrollTo(scrollOptions.left, scrollOptions.top);
 
   // Focus the first focusable element.
   focusableElements[0].focus({
	 preventScroll: true,
   })
 }
 
 backToTopButton.addEventListener('click', moveToTop);

/*///////////////////////////
/// Accessible modals by @tomaszbujnowicz 
/// https://github.com/tomaszbujnowicz/vanilla-js-tailwindcss-modal
//////////////////////////*/

/**
 * Modal
 * modal.openModal('modal-name');
 */
const modal = (() => {

	var publicAPIs = {};


	//
	// Settings
	//
	var settings = {
		speedOpen: 50,
		speedClose: 250,
		toggleClass: 'hidden',
		selectorTarget: '[data-modal-target]',
		selectorTrigger: '[data-modal-trigger]',
		selectorClose: '[data-modal-close]',
		selectorOverlay: '[data-modal-overlay]',
		selectorWrapper: '[data-modal-wrapper]',
		selectorInputFocus: '[data-modal-input-focus]'
	};


	/**
	* Element.closest() polyfill
	* https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
	*/
	if (!Element.prototype.closest) {
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
		}
		Element.prototype.closest = function (s) {
			var el = this;
			var ancestor = this;
			if (!document.documentElement.contains(el)) return null;
			do {
				if (ancestor.matches(s)) return ancestor;
				ancestor = ancestor.parentElement;
			} while (ancestor !== null);
			return null;
		};
	}

	// Trap Focus
	// https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
	//
	function trapFocus(element) {
		var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
		var firstFocusableEl = focusableEls[0];
		var lastFocusableEl = focusableEls[focusableEls.length - 1];
		var KEYCODE_TAB = 9;

		element.addEventListener('keydown', function (e) {
			var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

			if (!isTabPressed) {
				return;
			}

			if (e.shiftKey) /* shift + tab */ {
				if (document.activeElement === firstFocusableEl) {
					lastFocusableEl.focus();
					e.preventDefault();
				}
			} else /* tab */ {
				if (document.activeElement === lastFocusableEl) {
					firstFocusableEl.focus();
					e.preventDefault();
				}
			}
		});
	}


	//
	// Methods
	//

	// Toggle accessibility
	var toggleccessibility = function (event) {
		if (event.getAttribute('aria-expanded') === 'true') {
			event.setAttribute('aria-expanded', false);
		} else {
			event.setAttribute('aria-expanded', true);
		}
	};

	// Open Modal
	var openModal = function (event, destination) {

		var target = destination;

		// Check whether the modal is triggered automatically via modal.openModal
		if (typeof event === 'string') {
			target = document.getElementById(event);
			// If modal is triggered via modal.openModal we add a data attribute
			// to know whether toggleccessibility() should be used when closeModal
			// as there is no button used
			if (target) {
				target.setAttribute('data-auto-trigger', '');
			}
		}

		// If target doesn't exist, bail
		if (!target) return;

		// Find target
		var overlay = target.querySelector(settings.selectorOverlay),
			wrapper = target.querySelector(settings.selectorWrapper),
			input = target.querySelector(settings.selectorInputFocus);

		// Make it active and remoe hidden class
		target.classList.remove(settings.toggleClass);

		// Make body overflow hidden so it's not scrollable
		document.documentElement.style.overflow = 'hidden';

		// Toggle accessibility
		// Check whether the modal is triggered automatically via modal.openModal
		if (typeof event !== 'string') {
			toggleccessibility(event);
		}

		// Show wrapper
		setTimeout(function () {

			// Show overlay
			if (overlay) {
				var overlayIn = overlay.getAttribute('data-class-in').split(' '),
					overlayOut = overlay.getAttribute('data-class-out').split(' ');
				overlay.classList.remove(...overlayOut);
				overlay.classList.add(...overlayIn);
			}

			// Show drawer
			if (wrapper) {
				var wrapperIn = wrapper.getAttribute('data-class-in').split(' '),
					wrapperOut = wrapper.getAttribute('data-class-out').split(' ');
				wrapper.classList.remove(...wrapperOut);
				wrapper.classList.add(...wrapperIn);
			}

			// Focus on input
			if (input) {
				input.focus();
			}

			// Trap focus
			trapFocus(target);

		}, settings.speedOpen);

	};

	// Close Modal
	var closeModal = function (event) {

		// Find target
		var closestParent = event.closest(settings.selectorTarget),
			trigger = document.querySelector('[aria-controls="' + closestParent.id + '"'),
			overlay = closestParent.querySelector(settings.selectorOverlay),
			wrapper = closestParent.querySelector(settings.selectorWrapper);

		if (trigger === null) {
			trigger = document.querySelector('a[href="#' + closestParent.id + '"');
		}

		// Hide overlay
		if (overlay) {
			var overlayIn = overlay.getAttribute('data-class-in').split(' '),
				overlayOut = overlay.getAttribute('data-class-out').split(' ');
			overlay.classList.remove(...overlayIn);
			overlay.classList.add(...overlayOut);
		}

		// Hide wrapper
		if (wrapper) {
			var wrapperIn = wrapper.getAttribute('data-class-in').split(' '),
				wrapperOut = wrapper.getAttribute('data-class-out').split(' ');
			wrapper.classList.remove(...wrapperIn);
			wrapper.classList.add(...wrapperOut);
		}

		// Remove body overflow hidden
		document.documentElement.style.overflow = '';

		// Toggle accessibility
		// Check whether the modal was triggered automatically via modal.openModal
		if (closestParent.hasAttribute('data-auto-trigger')) {
			closestParent.removeAttribute('data-auto-trigger');
		} else {
			toggleccessibility(trigger);
		}

		// Make it not active
		setTimeout(function () {
			closestParent.classList.add(settings.toggleClass);
		}, settings.speedClose);

	};

	// Click Handler
	var clickHandler = function (event) {

		// Find toggle element
		var toggle = event.target,
			trigger,
			target,
			open = null;

		// Check whether toggle is:
		// 1. <button data-modal-trigger aria-controls="modal-name" ...
		// 2. <a href="#modal-name" ...
		// 3. null
		if (toggle.hasAttribute(settings.selectorTrigger.replace(/[\[\]']+/g, '')) && (toggle.hasAttribute('aria-controls'))) {
			trigger = toggle.closest(settings.selectorTrigger);
			target = document.getElementById(trigger.getAttribute('aria-controls'));
			open = true;
		} else if ((toggle.hash) && (toggle.hash.substr(1).indexOf('modal') > -1)) {
			trigger = toggle;
			target = document.getElementById(toggle.hash.substr(1));
			open = true;
		}

		var close = toggle.closest(settings.selectorClose);

		// Open modal when the open button is clicked
		if (open && target) {
			openModal(trigger, target);
		}

		// Close modal when the close button (or overlay area) is clicked
		if (close) {
			closeModal(close);
		}

		// Prevent default link behavior
		if (open || close) {
			event.preventDefault();
		}

	};

	// Keydown Handler, handle Escape button
	var keydownHandler = function (event) {

		if (event.key === 'Escape' || event.keyCode === 27) {

			// Find all possible modals
			var modals = document.querySelectorAll(settings.selectorTarget),
				i;

			// Find active modals and close them when escape is clicked
			for (i = 0; i < modals.length; ++i) {
				if (!modals[i].classList.contains(settings.toggleClass)) {
					closeModal(modals[i]);
				}
			}

		}

	};


	publicAPIs.init = function () {
		//
		// Inits & Event Listeners
		//
		document.addEventListener('click', clickHandler, false);
		document.addEventListener('keydown', keydownHandler, false);
	};

	publicAPIs.openModal = openModal;
	publicAPIs.closeModal = closeModal;

	return publicAPIs;

})();

document.addEventListener("DOMContentLoaded", function () {
	modal.init()
});
  
	