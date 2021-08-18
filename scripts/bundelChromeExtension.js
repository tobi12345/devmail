const fs = require("fs-extra")

const targetDir = "dist_chrome_extension"
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
