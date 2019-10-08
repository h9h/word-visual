export const defaults = {
	margin: {
		top: 10,
		right: 30,
		bottom: 40,
		left: 100
	}
}

export const mergeDefaults = options => {
	if (!options) {
		return defaults
	}

	const result = {
		...defaults,
		...options
	}

	if (options.margin) {
		result.margin.top = options.margin.top || defaults.margin.top
		result.margin.right = options.margin.right || defaults.margin.right
		result.margin.bottom = options.margin.bottom || defaults.margin.bottom
		result.margin.left = options.margin.left || defaults.margin.left
	}

	return result
}
