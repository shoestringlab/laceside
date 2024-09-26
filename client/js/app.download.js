import { a7 } from '/lib/altseven/dist/a7.js';
import { downloadZip } from "/lib/client-zip/index.js";



async function download() {
	// define what we want in the ZIP
	const jscode = { name: "app.js", lastModified: new Date(), input: a7.model.get("jsCode") };
	const csscode = { name: "styles.css", lastModified: new Date(), input: a7.model.get("cssCode") };
	const htmlcode = { name: "index.htm", lastModified: new Date(), input: a7.model.get("htmlCode") };

	// get the ZIP stream in a Blob
	const blob = await downloadZip([jscode, csscode, htmlcode]).blob();

	// make and click a temporary link to download the Blob
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = "app.zip";
	link.click();
	link.remove();
}


