/* eslint-disable no-undef */
const fs = require('fs')
const path = require('path')

const inquirer = require('inquirer').default

// Ask for component name
inquirer.prompt([
    {
        type: 'input',
        name: 'componentName',
        message: 'What is the name of the component?'
    }
]).then(answers => {
    const { componentName } = answers

    // Create the component directory
    const componentDir = path.join(__dirname, 'output', componentName)
    if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true })
    }

    // File paths
    const indexFile = path.join(componentDir, 'index.js')
    const jsxFile = path.join(componentDir, `${componentName}.jsx`)

    // Boilerplate content
    const indexContent = `export { default } from './${componentName}'\n`
    const jsxContent =
        `import React from 'react'
        import { StyleSheet, Text, View } from 'react-native'

        const ${componentName} = () => {
        const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          },
        })

        return (
            <View style={styles.container}>
            <Text></Text>
            </View>
        )
        }

        export default ${componentName}
`

    // Write files
    fs.writeFileSync(indexFile, indexContent)
    fs.writeFileSync(jsxFile, jsxContent)

    console.log(`${componentName} component created successfully!`)
}).catch(error => {
    console.error('Error creating component:', error)
})
