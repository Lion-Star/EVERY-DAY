const fs = require("fs")

const path = require("path")

module.exports = (req, res, next) => {
    let url = path.join(process.cwd(), req.path)
    console.log(url, req.path);

    if (fs.existsSync(url)) {
        if (fs.statSync(url).isDirectory()) {
            let dirList = fs.readdirSync(url)

            res.render("index", {
                list: dirList,
                title: "标题"
            })
        } else {
            next()
        }
    } else {
        next()
    }
}