import { a7 } from '/lib/altseven/dist/a7.js';
import { downloadZip } from "/lib/client-zip/index.js";


export { download };

async function download() {
 	// define what we want in the ZIP
	let app = a7.model.get("app");
	const jscode = { name: "app.js", lastModified: new Date(), input: app.jsCode };
	const csscode = { name: "app.css", lastModified: new Date(), input: app.cssCode };
	const htmlcode = { name: "app.htm", lastModified: new Date(), input: app.htmlCode };

	let htmlDoc = document.getElementById('iframe').contentWindow.document.documentElement.outerHTML;

	const blob = await downloadZip([{ name: "index.htm", lastModified: new Date(), input: htmlDoc }, jscode, csscode, htmlcode ]).blob();

	// make and click a temporary link to download the Blob
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = "app.zip";
	link.click();
	link.remove();
}


