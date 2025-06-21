class $Wrapper {
    constructor(input) {
        if (typeof input === "string") {
            this.elements = Array.from(document.querySelectorAll(input));
        } else if (input instanceof Element) {
            this.elements = [input];
        } else if (input instanceof NodeList || Array.isArray(input)) {
            this.elements = Array.from(input);
        } else {
            this.elements = [];
        }
    }

    on(events, callback) {
        this.elements.forEach(el =>
            events.split(" ").forEach(evt => el.addEventListener(evt, callback))
        );
        return this;
    }

    each(callback) {
        this.elements.forEach((el, i) => callback.call(el, i, el));
        return this;
    }

    css(attr, value) {
        this.elements.forEach(el => el.style[attr] = value);
        return this;
    }

    html(content) {
        this.elements.forEach(el => el.innerHTML = content);
        return this;
    }

    text(content) {
        this.elements.forEach(el => el.textContent = content);
        return this;
    }

    attr(name, value) {
        if (value !== undefined) {
            this.elements.forEach(el => el.setAttribute(name, value));
            return this;
        } else {
            return this.elements.map(el => el.getAttribute(name));
        }
    }

    addClass(name) {
        this.elements.forEach(el => el.classList.add(name));
        return this;
    }

    removeClass(name) {
        this.elements.forEach(el => el.classList.remove(name));
        return this;
    }

    toggleClass(name) {
        this.elements.forEach(el => el.classList.toggle(name));
        return this;
    }

    $(selector) {
        let descendants = this.elements.flatMap(el => Array.from(el.querySelectorAll(selector)));
        return new $Wrapper(descendants);
    }
}

function $(selector) {
    const wrapper = new $Wrapper(selector);
    return new Proxy(wrapper, {
        get(target, prop) {
            if (prop in target) return target[prop];
            if (!isNaN(prop)) return target.elements[prop];
            if (target.elements.length === 1 && prop in target.elements[0]) return target.elements[0][prop];
            if (target.elements.length > 1 && prop in target.elements) return target.elements[prop];
            
            return undefined;
        },
        set(target, prop, value) {
            if (!isNaN(prop)) {
                target.elements[prop] = value;
                return true;
            }
            target[prop] = value;
            return true;
        }
    });
}
