<template>
  <el-container>
      <el-header>Header</el-header>
        <el-container>
          <el-aside width="300px">Aside</el-aside>
          <el-main>
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
    }
  },
  methods: {
    getData(){    
      this.$http.get("/api/search",{pageNum:this.pageNum,limit:this.limit}).then(res =>{
        if(res.data.code === 0){
          console.log("defeat");
        }else{
          this.tableData = res.data.data
          this.total=res.data.total
        }
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.$http.get("/api/del",{id:index}).then(res =>{
        if(res.data.code === 1){
          console.log("删除成功");
        }else{
          console.log("失败");
        }
      })
    },
    handleSizeChange(val) {
      this.limit=val
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
    }
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
