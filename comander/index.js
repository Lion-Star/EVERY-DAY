#! /usr/bin/env node

let program = require('commander');

const inquirer = require('inquirer');

const fs = require('fs');

const path = require('path');

const axios = require('axios')

function getList(){
    return new Promise((resolve,reject) => {
        axios.get('http://localhost:8000/list').then(res => {
            console.log(res.data)
            resolve(res.data.questionList)
        })
    })
}

getList().then(res => {
    program
        .version('1.0.0')
        .command('login')
        .description('登录npm')
        .action(function(){
            inquirer.prompt(res).then(answers => {
                console.log(answers);
                axios.post('http://localhost:8000/answer',answers).then(res => {
                    console.log("提交成功")
                })
            })
        })

    program.parse(process.argv)
})



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

