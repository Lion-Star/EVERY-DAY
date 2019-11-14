<template>
  <el-container>
      <el-header>Header</el-header>
        <el-container>
            <el-aside width="300px">Aside</el-aside>
          <el-main>
            <div>
              <!-- Form -->
              <el-button type="text" @click="dialogFormVisible = true; type=0;">添加用户信息</el-button>
              <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="user" :label-width="formLabelWidth">
                    <el-input v-model="form.user" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="pwd" :label-width="formLabelWidth">
                    <el-input v-model="form.pwd" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="phone" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="address" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false;form={}">取 消</el-button>
                  <el-button type="primary" @click="sure">确 定</el-button>
                </div>
              </el-dialog>
            </div>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                label="用户名"
                width="300">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.user }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="密码"
                width="300">
                 <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.pwd }}</span>
                </template>
              </el-table-column>
                <el-table-column
                label="电话"
                width="300">
                 <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.phone }}</span>
                </template>
              </el-table-column>
                <el-table-column
                label="地址"
                width="300">
                 <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.address }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                   type="text" 
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
             <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage2"
                :page-sizes="[2, 3, 4, 5]"
                :page-size="limit"
                layout="sizes, prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {

  data(){
    return {
      pageNum:1,
      limit:2,
      total:0,
      tableData:[],
      currentPage2: 1,
      type:0,
      dialogFormVisible: false,
      form: {
        user: '',
        pwd: '',
        phone: '',
        address:"",
        id:""
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    sure(){
      
      if(this.type===0){
          this.$http.post("/api/login",{...this.form})
          this.$message({
              message: '恭喜你，成功添加',
              type: 'success'
            });
          this.dialogFormVisible = false
          this.reset()
      }else{  
        this.$http.post("/api/edit",{...this.form}).then(res=>{
          if(res.data.code===1){
            this.$message({
              message: '恭喜你，成功修改',
              type: 'success'
            });
            this.dialogFormVisible = false
          }else{
           this.$message.error('修改失败');
          }
        })
        this.reset()
      }
     
    },
    getData(){    
      this.$http.get("/api/search",{params:{pageNum:this.pageNum,limit:this.limit}}).then(res =>{
        if(res.data.code === 0){
          console.log("defeat");
        }else{
          this.tableData = res.data.data
          this.total=res.data.total
        }
      })
    },
    handleEdit(index, row) {
      console.log(row);
      this.dialogFormVisible=true
      this.type=1;
      console.log(row);
      
      this. form= {
        user: row.user,
        pwd: row.pwd,
        phone: row.phone,
        address:row.address,
        id:row.id
      }
    },
    handleDelete(index, row) {   //删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.get("/api/del",{params:{id:row.id}}).then(res =>{
            if(res.data.code === 1){
                  this.$message({
                type: 'success',
                message: '删除成功!'
              });
              console.log(this.limit);
              
              this.$http.get("/api/search",{params:{pageNum:this.pageNum,limit:this.limit}}).then(res =>{
                if(res.data.code === 0){
                  console.log("defeat");
                }else{
                  this.tableData = res.data.data
                  this.total=res.data.total
                }
                console.log( this.tableData);
                
              })
            }else{
              console.log("失败");
            }
          })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    
     
    },
    handleSizeChange(val) {
      this.limit=val
      console.log(val);
      
      this.$http.get("/api/search",{params:{pageNum:this.pageNum,limit:this.limit}}).then(res =>{
        if(res.data.code === 0){
          console.log("defeat");
        }else{
          this.tableData = res.data.data
          this.total=res.data.total
        }
      })
    },
    handleCurrentChange(val) {   
      this.$http.get("/api/search",{params:{pageNum:val,limit:this.limit}}).then(res =>{
        if(res.data.code === 0){
          console.log("defeat");
        }else{
          this.tableData = res.data.data
          this.total=res.data.total
        }
      })
    },
    reset(){
    this.form={}
    console.log(this.form);
    
  },
  },
  
  created(){
    this.getData()
  }

}
</script>

<style lang="scss">
  

  .el-container {
   width: 100%;
   height: 100%;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
   
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    
  }
</style>
