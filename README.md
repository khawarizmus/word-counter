# word-counter

<p align="center">
  <img alt="counter" src="./logo.png" height="200" />
  <p align="center">
    <a href="https://github.com/gimyboya/word-counter/actions">
      <img src="https://github.com/gimyboya/word-counter/workflows/Build/badge.svg?branch=main" />
    </a>
    <a href="https://codecov.io/gh/gimyboya/word-counter">
      <img src="https://codecov.io/gh/gimyboya/word-counter/branch/main/graph/badge.svg" />
    </a>
    <a href="https://github.com/semantic-release/semantic-release">
      <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" />
    </a>
    <a href="http://commitizen.github.io/cz-cli/">
      <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" />
    </a>
  </p>
</p>

🧮 A CLI that counts words in your text file, because why not. 🧮

# Installation
To be able to use the CLI you can either download the released source code [here](https://github.com/gimyboya/word-counter/releases) or clone this repository locally.

```bash
git clone https://github.com/gimyboya/word-counter.git
```
Install the dependencies
```bash
npm install # or (preferably) yarn install
```
Build the project
```bash
npm run build # of yarn build
```
The build process will generate a `dist` folder where you can find both the binaries (for linux, mac and windows) and the javascript files.

at this point from the root or the project you can either run

```bash
node dist/index.js -h
```
or simply use the binary
```bash
word-counter-win.exe -h # windows x64 bit architecture binary
```
# Usage
```bash
word-counter/0.0.0                                     
                                                       
Usage:                                                 
  $ word-counter <file>                                
                                                       
Commands:                                              
  <file>  file name or path to count the words         
                                                       
For more info, run any command with the `--help` flag: 
  $ word-counter --help                                
                                                       
Options:                                               
  -V, --verbose  Verbose logging                       
  -h, --help     Display this message                  
  -v, --version  Display version number                
                                                       
Examples:                                              
word-counter myTextFile.txt                            
word-counter path/to/myTextFile.txt                    
```
the CLI usage is quite simple we just need to invoke it and pass it either a file name or a path to the file name. it will then calculate word frequencies in the file.

# The Solution

The CLI supports only `.txt` file format and conceders one letter word tokens as whole words eg: `&`.

the CLI will normalize the file content by converting all characters to lowercase and [deburring](https://lodash.com/docs/4.17.15#deburr) the content.

the output will be a set of lines displaying each word and it's frequency in a defending order. 

```bash
input: Paranoids are not paranoid because they’re paranoid, but because they keep putting themselves deliberately into paranoid situations.

output:
paranoid: 3
because: 2
paranoids: 1
are: 1
not: 1
they’re: 1
but: 1
they: 1
keep: 1
putting: 1
themselves: 1
deliberately: 1
into: 1
situations: 1

task done in: 47 ms
```
# Project Workflow

There is a [dedicated section](./docs/Workflow.md) talking about the codding practices and workflows that went into building this CLI. 
# Contribution

For future contributors please make sure to read the [Contributing Guide](./.github/GUIDE.md) before making a pull request.
# Credit

The logo is made by [Sahira Khader](https://dribbble.com/in_awe) and can be found [here](https://www.behance.net/gallery/78881117/Verbicons).
