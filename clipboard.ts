export async function copyToClipboard(text: string) {
	if (navigator.clipboard && navigator.clipboard.writeText) {
		try {
			await navigator.clipboard.writeText(text);
			console.log("✅ Copied via navigator.clipboard");
			return;
		} catch (err) {
			console.warn("⚠️ navigator.clipboard failed, fallback to textarea", err);
		}
	}

	// Fallback for environments without clipboard API
	const el = document.createElement("textarea");
	el.value = text;
	el.setAttribute("readonly", "");
	el.style.position = "absolute";
	el.style.left = "-9999px";
	document.body.appendChild(el);
	el.select();
	document.execCommand("copy");
	document.body.removeChild(el);
}
