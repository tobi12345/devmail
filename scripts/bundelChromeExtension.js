const fs = require("fs-extra")

const targetDir = "dist_chrome_extension"
const assetTargetDir = "dist_chrome_extension/assets"
const srcDirConfig = "chrome_extension"
const srcDirUi = "dist_ui_inbox"
const srcDirBackground = "dist/ui-background"

if (fs.existsSync(targetDir)) {
	fs.emptyDirSync(targetDir)
} else {
	fs.mkdirSync(targetDir)
}

fs.copySync(srcDirConfig, targetDir, {
	recursive: true,
})
fs.copySync(srcDirUi, targetDir, {
	recursive: true,
})

fs.copySync(srcDirBackground, targetDir, {
	recursive: true,
})

const keepAssets = ["favicon-48x48.png", "favicon-32x32.png", "favicon-16x16.png"]
fs.readdirSync(assetTargetDir).forEach((file) => {
	if (keepAssets.includes(file)) {
		return
	}

	fs.unlinkSync(`${assetTargetDir}/${file}`)
})
