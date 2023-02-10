const fs = require('fs')

export const updateJsonFile = (fileName, obj) => {
    return new Promise((resolve) => {
        if (fs.existsSync(fileName)) {
            // 读出模板下的package.json文件
            const data = fs.readFileSync(fileName).toString();
            // 转为json对象
            let json = JSON.parse(data);
            // 将用户输入的更新到模板package.json文件
            Object.keys(obj).forEach(key => {
                json[key] = obj[key];
            });
            console.log('json', json);
            // 重写模板下的package.json文件
            fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
            resolve();
        }
    });
}
