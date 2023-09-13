const path = require('path');
const fs = require('fs');

function copyFolderSync(source, target) {
    // 确保目标文件夹存在
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

    // 读取源文件夹中的所有项目
    const items = fs.readdirSync(source);

    // 遍历源文件夹中的每个项目
    items.forEach(item => {
        const sourcePath = path.join(source, item);
        const targetPath = path.join(target, item);

        // 检查项目是文件还是文件夹
        if (fs.statSync(sourcePath).isDirectory()) {
            // 如果是文件夹，递归调用copyFolderSync
            copyFolderSync(sourcePath, targetPath);
        } else {
            // 如果是文件，将其复制到目标文件夹
            fs.copyFileSync(sourcePath, targetPath);
        }
    });
}

module.exports = {
    copyFolderSync
}