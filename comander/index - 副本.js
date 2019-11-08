#! /usr/bin/env node

let program = require('commander');

const inquirer = require('inquirer');

const fs = require('fs');

const path = require('path');

const promptList = [
    {
        type: 'input',
        message: '设置项目名称:',
        name: 'name',
        default: "test_user" // 默认值
    },
    {
        type: 'input',
        message: '请输入手机号:',
        name: 'phone',
        validate: function(val) {
            if(val.match(/\d{11}/g)) { // 校验位数
                return true;
            }
            return "请输入11位数字";
        }
    },

    {
        type: 'input',
        message: '设置版本号',
        name: 'version',
        default: "1.0.0" // 默认值
    }
    ,

    {
        type: 'input',
        message: '设置作者',
        name: 'author'
    }
];

program
    .version('1.0.0')
    .command('init')
    .description('初始化package.json文件')
    .action(function(){
        inquirer.prompt(promptList).then(answers => {
            fs.writeFileSync(path.join(process.cwd(),'package.json'),JSON.stringify(answers))
        })
    })

program.parse(process.argv)

// program
//     .version('1.0.0','-v,--version')  //-V --version
//     .option('-a|--add','add something')
//     .option('-u|--update','update something')
//     .option('-r|--remove','remove something')
//     .option('--add-file','add a file')
//     .option('--no-add','not add a file')
//     .parse(process.argv)

// console.log('You choose:')

// if(program.add){
//     console.log("add something")
// }else{
//     console.log("not add a file")
// }

// if(program.update){
//     console.log("update something")
// }

// if(program.remove){
//     console.log("remove something")
// }

// if(program.addFile){
//     console.log('add a file')
// }

