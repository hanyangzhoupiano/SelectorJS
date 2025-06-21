const jMethods = {
    html(content) {
        if (content === undefined) return this.elements.map(el => el.innerHTML);
        this.elements.forEach(el => el.innerHTML = content);
        return this;
    },

    css(attribute, value) {
        const el = this.elements[0];
        if (value === undefined) return el?.style[attribute] || getComputedStyle(el)[attribute];
        this.elements.forEach(el => el.style[attribute] = value);
        return this;
    },

    text(content) {
        if (content === undefined) return this.elements.map(el => el.textContent);
        this.elements.forEach(el => el.textContent = content);
        return this;
    },

    attr(name, value) {
        if (value === undefined) return this.elements.map(el => el.getAttribute(name));
        this.elements.forEach(el => el.setAttribute(name, value));
        return this;
    },

    on(events, callback) {
        this.elements.forEach(el =>
            events.split(" ").forEach(evt => el.addEventListener(evt, callback))
        );
        return this;
    },

    each(callback) {
        this.elements.forEach((el, i) => callback.call(el, i, el));
        return this;
    },

    addClass(className) {
        this.elements.forEach(el => el.classList.add(className));
        return this;
    },

    removeClass(className) {
        this.elements.forEach(el => el.classList.remove(className));
        return this;
    },

    toggleClass(className) {
        this.elements.forEach(el => el.classList.toggle(className));
        return this;
    },

    $(selector) {
        const descendants = this.elements.flatMap(el =>
            Array.from(el.querySelectorAll(selector))
        );
        return new jSelector(descendants);
    }
};

class jSelector {
    constructor(elements) {
        this.elements = Array.from(elements);
        return new Proxy(this, {
            get(target, prop) {
                if (prop in target) return target[prop];
                const el = target.elements[0];
                const val = el?.[prop];
                return typeof val === "function" ? val.bind(el) : val;
            }
        });
    }
}

Object.assign(jSelector.prototype, jMethods);

function $(selector) {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 1) {
        const el = elements[0];
        const wrapped = { elements: [el] };

        for (let [key, func] of Object.entries(jMethods)) {
            el[key] = func.bind(wrapped);
        }

        return el;
    }
    return new jSelector(elements);
}
