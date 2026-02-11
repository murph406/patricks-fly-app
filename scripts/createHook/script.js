/* eslint-disable no-undef */
const fs = require('fs')
const path = require('path')

const inquirer = require('inquirer').default

const inputs = [
    {
        type: 'input',
        name: 'hookName',
        message: 'What is the name of the hook?'
    }
]

inquirer.prompt(inputs).then((res) => {
    const { hookName } = res
    const componentDir = path.join(__dirname, 'output', hookName)

    if (!fs.existsSync(componentDir)) fs.mkdirSync(componentDir, { recursive: true })
    const indexFile = path.join(componentDir, 'index.js')
    const indexContent = `import React from 'react'\n\nconst ${hookName} = () => {\n const [counter, setCounter ] = React.useState(0)\n\n return {\n counter, \n setCounter\n }\n}\n\nexport default ${hookName}\n`

    fs.writeFileSync(indexFile, indexContent)

    console.log(`${hookName} created successfully!`)
}).catch(error => {
    console.error('Error creating component:', error)
})