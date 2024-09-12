import { a7 } from '/lib/altseven/dist/a7.js';

export var Description = function Description(props) {
	const description = a7.components.Constructor(a7.components.View, [props], true);

	description.state = { text: props.description, appID: props.appID };

	description.on("rendered", function () {

	});
	description.template = function () {
		return `<div name="appDescription">${description.state.description}</div>`;
	};

	return description;
};
