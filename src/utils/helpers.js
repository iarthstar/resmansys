/**
 * Gets a particular property value.
 * @param {the object to get data from} from
 * @param {pattern to select get a value} selector
 * @param {default value if nothing is found} defaultVal
 *
 * Example:
 * const obj = { selector: { to: { val: 'val to select' } }, target: [1, 2, { a: 'test' }] };
 * get(obj, 'selector.to.val');   returns 'value to select'
 */
export const get = (from, selector, defaultVal) => {
	const result = selector
		.replace(/\[([^\[\]]*)\]/g, '.$1.')
		.split('.')
		.reduce((prev, cur) => prev && prev[cur], from);
	return ([undefined, null].includes(result) && defaultVal !== undefined) ? defaultVal : result;
};

export const isEmpty = (obj) => JSON.stringify(obj) === "{}";