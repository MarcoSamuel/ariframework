import {treeRenderPlugin} from '@arijs/stream-xml-parser/src/treerender';
import elementDefault from '@arijs/stream-xml-parser/src/element/default';
import elementDom from '@arijs/stream-xml-parser/src/element/dom';
import renderText from './tree/text';
import renderNode from './tree/node';
import fnPluginRender from './tree/plugin';
import {options} from '@arijs/frontend/src/utils/extend';
// import {arrayFrom} from '@arijs/frontend/src/utils/collection';

const optDefault = {
	// node: null,
	elAdapter: elementDefault(),
	renderAdapter: elementDom(document),
	renderPlugin: null,
	ctxRender: null,
	ctxTree: null,
	renderText,
	renderNode,
};

export default function renderComponent(node, opt = {}) {
	// var ctx;
	// var elAdapter = StreamXMLParser.elementDefault();
	// html = fw_parseHtml(html, elAdapter);
	let {
		// node,
		elAdapter,
		renderAdapter,
		renderPlugin,
		ctxRender,
		ctxTree,
		renderText,
		renderNode
	} = options(optDefault, opt);
	if (!renderPlugin) {
		renderPlugin = fnPluginRender(
			ctxRender, renderText, renderNode
		);
	}
	node = treeRenderPlugin(node, elAdapter, ctxTree, renderPlugin, renderAdapter, true);
	return renderAdapter.toArray(node);
	// console.log('result parse', fpath);
	// console.log(html);
}
