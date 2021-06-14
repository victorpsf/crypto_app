export default class InputRules {
	constructor(rules) {
		this.rules = rules
	}

	setArguments(args) {
		this.args = args
	}

	setElement(el = document.createElement('input')) {
		this.el = el
	}

	__init__() {

	}

	__attr__() {

	}

	build() {
		this.__init__()
	}
}