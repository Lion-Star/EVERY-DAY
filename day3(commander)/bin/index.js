#! /usr/bin/env node

const program = require('commander');

const inquirer = require("inquirer");

// program
//     .version('1.0.0', '-v, --version')
//     .option("-a,--add", "add some thing")
//     .option("--no-add", "add some thing")
//     .option('--add-file', 'add a file')
//     .parse(process.argv)

// program.add ? console.log("addsomething") : console.log("not add something")

// if (program.addFile) console.log('add a file')

const promptList = [

    {
        type: 'input',
        message: '设置一个用户名:',
        name: 'name',
        default: "test_user" // 默认值
    },
    {
        type: 'input',
        message: '请输入手机号:',
        name: 'phone',
        validate: function(val) {
            if (!val.match(/\d{11}/g)) { // 校验位数
                return true
            }
        }
    },
    {
        type: 'input',
        message: '设置一个用户名:',
        name: 'name',
        default: "test_user" // 默认值
    }
];


program
    .version('1.0.0', '-v, --version')
    .command('init')
    .description('It is my cli')
    .action(function() {
        console.log("动作");
    })
program.parse(process.argv)

inquirer.prompt(promptList).then(answers => {
    console.log(answers); // 返回的结果
})