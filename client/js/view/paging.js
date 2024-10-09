import { a7 } from '/lib/altseven/dist/a7.js';

export var Paging = function Paging(props) {
	var paging = a7.components.Constructor(a7.components.View, [props], true);

	paging.state = {
		offset: props.offset || 0,
		records: props.records || [],
		pageSize: props.pageSize || 5
	};

	paging.eventHandlers = {
		page: function (event) {
			let offset = parseInt(event.currentTarget.attributes['data-offset'].value, 10);
			let pState = paging.getState();
			pState.offset = offset;
			paging.setState(pState);

			// set parent to base state when paging
			let state = paging.getParent().getBaseState();
			state.offset = offset;
			paging.getParent().setState(state);
		}
	};

	paging.on("rendered", function () {

	});

	paging.template = function () {

		let state = paging.getState();
		let templ = ``;
		let offset = parseInt(state.offset, 10);
		a7.log.trace("paging offset: " + offset);
		if (state.records.length > state.pageSize) {
			templ = `<div class="paging">`;
			if (offset > 0) {
				templ += `<span><a name="previousPage" data-onclick="page" data-offset="${Math.max(0, state.offset - state.pageSize)}">
                  <svg class="feather">
                    <use xlink:href="/lib/feather-icons/dist/feather-sprite.svg#chevron-left"/>
                  </svg>
                  </a></span>`;
			}

			templ += `<span>${offset + 1}-${Math.min(offset + state.pageSize, state.records.length)} of ${state.records.length}</span>`;
			if (state.offset + state.pageSize < state.records.length) {
				templ += `<span><a name="nextPage" data-onclick="page" data-offset="${Math.min(state.records.length, offset + state.pageSize)}">
                  <svg class="feather">
                    <use xlink:href="/lib/feather-icons/dist/feather-sprite.svg#chevron-right"/>
                  </svg>
                  </a></span>`;
			}
			templ += `</div>`;
		}
		return templ;
	};
	return paging;
};
