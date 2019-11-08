#! /usr/bin/env node

let program = require('commander');

const inquirer = require('inquirer');

const fs = require('fs');

const path = require('path');

const axios = require('axios')

const promptList = [
    {
        type: 'input',
        message: '请输入用户名:',
        name: 'name'
    },
    {
        type: 'password',
        message: '设置密码',
        name: 'pwd'
    }
    ,
    {
        type: 'input',
        message: '邮箱',
        name: 'email'
    }
];

program
    .version('1.0.0')
    .command('login')
    .description('登录npm')
    .action(function(){
        inquirer.prompt(promptList).then(answers => {
            console.log(answers)

            //请求
            axios.post('http://localhost:8000/login',answers).then(res => {
                if(res.data.code === 1){
                    console.log("登录成功")
                }else{
                    console.log("登录失败")
                }
            })
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

