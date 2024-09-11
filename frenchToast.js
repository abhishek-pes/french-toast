const template = document.createElement('template')
template.innerHTML =
    `
<style>
    h3 {
        color: #222;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .toast-message {
        display: none;
        opacity: 0;
        background-color: #d3d3d3;
        border: 1px solid black;
        border-radius: 1em;
        width: max-content;
        padding: 0.5em 1em;
        position: absolute;
        right: 1em;
        transition: opacity 0.5s ease
    }

    .top {
        top: 1em;
    }

    .left {
        left: 1em;
    }

    .right {
        right: 1em;
    }

    .bottom {
        bottom: 1em;
    }

    .center {
        right: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }

    .show {
        opacity: 1;
        display: flex;
        gap: 0.4em;
        align-items: center;
    }

    #icon {
        width: 32px;
        height: 32px;
    }
</style>

<div class='toast-message'>
    <span id='icon'>

    </span>
    <p>
        <slot />
    </p>
</div>
`

const warningIcon =
    `
<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd"
        d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM11.25 13.5V8.25H12.75V13.5H11.25ZM11.25 15.75V14.25H12.75V15.75H11.25Z"
        fill="#080341" />
</svg>
`

const successIcon =
    `
<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="32px" height="32px" viewBox="0 0 24 24">
    <path fill-rule="evenodd"
        d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M15.2928932,8.29289322 L10,13.5857864 L8.70710678,12.2928932 C8.31658249,11.9023689 7.68341751,11.9023689 7.29289322,12.2928932 C6.90236893,12.6834175 6.90236893,13.3165825 7.29289322,13.7071068 L9.29289322,15.7071068 C9.68341751,16.0976311 10.3165825,16.0976311 10.7071068,15.7071068 L16.7071068,9.70710678 C17.0976311,9.31658249 17.0976311,8.68341751 16.7071068,8.29289322 C16.3165825,7.90236893 15.6834175,7.90236893 15.2928932,8.29289322 Z" />
</svg>
`

const errorIcon = 
    `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px"
    viewBox="0 0 512 512" version="1.1">
    <title>error</title>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="add" fill="#000000" transform="translate(42.666667, 42.666667)">
            <path
                d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,42.6666667 C119.232,42.6666667 42.6666667,119.232 42.6666667,213.333333 C42.6666667,307.434667 119.232,384 213.333333,384 C307.434667,384 384,307.434667 384,213.333333 C384,119.232 307.434667,42.6666667 213.333333,42.6666667 Z M262.250667,134.250667 L292.416,164.416 L243.498667,213.333333 L292.416,262.250667 L262.250667,292.416 L213.333333,243.498667 L164.416,292.416 L134.250667,262.250667 L183.168,213.333333 L134.250667,164.416 L164.416,134.250667 L213.333333,183.168 L262.250667,134.250667 Z"
                id="error">

            </path>
        </g>
    </g>
</svg>
`

const defaultIcon =
    `
<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5" />
    <path d="M12 17V11" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
    <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#1C274C" />
</svg>
`

class FrenchToast extends HTMLElement {

    static toastElementCount = 0

    static get observedAttributes() {
        return ['open', 'placement', 'type', 'duration']
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.dismissDuration = 3000
        this.allowed_placements = ['top', 'right', 'bottom', 'left', 'center']

        // placeholder values
        this.toastType = null
        this.placement = ''
        this.toastMessageElement = null
        this.iconElement = ''

        // Keeping count of total toast element created.
        FrenchToast.toastElementCount += 1
    }

    connectedCallback() {

        this.toastType = this.getAttribute('type')
        this.placement = this.getAttribute('placement')
        this.toastMessageElement = this.shadowRoot.querySelector('.toast-message')
        this.iconElement = this.shadowRoot.querySelector('#icon')

        // add background to toast message
        this.setBackgroundColor()

        // set position for toast message
        this.setPlacement()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open' && newValue == 'true') {
            this.showToast();
        }

        if (name === 'placement' && oldValue !== newValue && this.toastMessageElement) {
            this.placement = this.getAttribute('placement')
            this.setPlacement();
        }

        if (name === 'type' && oldValue !== newValue && this.toastMessageElement) {
            this.toastType = this.getAttribute('type')
            this.setBackgroundColor();
        }

        if (name === 'duration' && oldValue !== newValue) {
            this.dismissDuration = newValue;
        }

    }

    showToast() {
        this.toastMessageElement.classList.add('show')
        setTimeout(() => {
            this.toastMessageElement.classList.remove('show')
            this.setAttribute('open', 'false')
        }, this.dismissDuration)
    }

    setPlacement() {
        const placement_arr = this.placement.split(' ')
        placement_arr.forEach(element => {
            if (this.allowed_placements.includes(element)) {
                this.toastMessageElement.classList.add(element)
            }
        });

    }

    // sets background color as well as the icon
    setBackgroundColor() {
        switch (this.toastType) {
            case 'warning':
                this.toastMessageElement.style.backgroundColor = 'orange'
                this.iconElement.innerHTML = warningIcon
                break

            case 'success':
                this.toastMessageElement.style.backgroundColor = 'lightgreen'
                this.iconElement.innerHTML = successIcon
                break

            case 'error':
                this.toastMessageElement.style.backgroundColor = '#ea5d5d'
                this.iconElement.innerHTML = errorIcon
                break

            default:
                this.toastMessageElement.style.backgroundColor = '#d3d3d3'
                this.iconElement.innerHTML = defaultIcon
                break
        }
    }
}

window.customElements.define('french-toast', FrenchToast)