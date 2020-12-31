const fs = require('fs')
require('dotenv/config')

module.exports = {
    uploadFile(req, res) {
        const { 
            key, 
            size, 
            originalname: name, 
        } = req.file
        
        const url = `${process.env.API_BASE_URL}/files/${key}`
        return res.json({
            url,
            key,
            name,
            size
        })
    },
    getListFiles(req, res) {
        const directoryPath = `${__dirname}/../../tmp/uploads`
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                return res.status(500).send({
                    error: err.message
                })
            }
            let fileInfos = []
            files.forEach((file) => {
                fileInfos.push({
                    name: file,
                    url: `${process.env.API_BASE_URL}/files/${file}`
                })
            })
            return res.status(200).send(fileInfos)
        })
    }
}
