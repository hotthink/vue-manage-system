<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 用户管理
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10" clearable></el-input>
				<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
			</div>
			<el-table :data="tableData" border stripe class="table" ref="multipleTable">
				<el-table-column label="用户姓名">
					<template slot-scope="scope">
						<el-button v-if="scope.row['uname']==''" type="text" style="color:lightgray;">点击添加</el-button>
						<el-button v-else type="text">{{scope.row['uname']}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="120"></el-table-column>
				<el-table-column prop="tel" label="电话" width="120"></el-table-column>
				<el-table-column prop="adddate" label="绑定时间" sortable width="150"></el-table-column>
				<el-table-column prop="openid" label="openid"></el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<component v-for="optbtn in optbtns" v-bind:is="optbtn" @click="handleOpt(optbtn, scope.$index, scope.row)"></component>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalpage"></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" :visible.sync="editVisible" width="30%">
			<el-form ref="form" :model="form" label-width="50px">
				<el-form-item label="日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 删除提示框 -->
		<el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
			<div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteRow">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import request from "@/utils/request";
	export default {
		name: "basetable",
		data() {
			return {
				tableData: [],
				cur_page: 1,
				totalpage: 1,
				multipleSelection: [],
				select_word: "",
				optbtns: ['delete', 'modify', 'premiss'],
				del_list: [],
				editVisible: false,
				delVisible: false,
				form: {
					name: "",
					date: "",
					address: ""
				},
				idx: -1,
				id: -1
			};
		},
		created() {
			this.getData();
		},
		components: {
			'delete': {
				render: function(h) {
					return h('el-button', {
						'class': 'red',
						props: {
							type: 'text',
							icon: 'el-icon-delete'
						},
						on: {
							click: (evt) => {
								this.$emit('click', evt);
							}
						},
					}, '删除');
				}

			},
			'modify': {
				render: function(h) {
					return h('el-button', {
						props: {
							type: 'text',
							icon: 'el-icon-edit'
						},
						on: {
							click: (evt) => {
								this.$emit('click', evt);
							}
						},
					}, '修改');
				}

			},
			'premiss': {
				render: function(h) {
					return h('el-button', {
						props: {
							type: 'text',
							icon: 'el-icon-setting'
						},
						on: {
							click: (evt) => {
								this.$emit('click', evt);
							}
						},
					}, '权限');
				}

			},
		},
		methods: {
			// 分页导航
			handleCurrentChange(val) {
				this.cur_page = val;
				this.getData();
			},
			// 获取 easy-mock 的模拟数据
			getData() {
				request({
					url: "/useradmin/index",
					method: "post",
					data: {
						action: "query",
						page: this.cur_page,
						key: this.select_word
					}
				}).then(res => {
					console.log("res", res);
					this.tableData = res.dlist;
					this.totalpage = res.totalpage;
				});
			},
			search() {
				this.cur_page = 1;
				this.getData();
			},

			handleOpt(opt, index, row) {
				console.log(opt);
				console.log(index);
				console.log(row);
			},
			handleEdit(index, row) {
				this.idx = index;
				this.id = row.id;
				this.form = {
					id: row.id,
					name: row.name,
					date: row.date,
					address: row.address
				};
				this.editVisible = true;
			},
			handleDelete(index, row) {
				this.idx = index;
				this.id = row.id;
				this.delVisible = true;
			},

			// 保存编辑
			saveEdit() {
				this.editVisible = false;
				this.$message.success(`修改第 ${this.idx + 1} 行成功`);
				if (this.tableData[this.idx].id === this.id) {
					this.$set(this.tableData, this.idx, this.form);
				} else {
					for (let i = 0; i < this.tableData.length; i++) {
						if (this.tableData[i].id === this.id) {
							this.$set(this.tableData, i, this.form);
							return;
						}
					}
				}
			},
			// 确定删除
			deleteRow() {
				this.$message.success("删除成功");
				this.delVisible = false;
				if (this.tableData[this.idx].id === this.id) {
					this.tableData.splice(this.idx, 1);
				} else {
					for (let i = 0; i < this.tableData.length; i++) {
						if (this.tableData[i].id === this.id) {
							this.tableData.splice(i, 1);
							return;
						}
					}
				}
			}
		}

	};
</script>

<style scoped>
	.handle-box {
		margin-bottom: 20px;
	}

	.handle-select {
		width: 120px;
	}

	.handle-input {
		width: 300px;
		display: inline-block;
	}

	.del-dialog-cnt {
		font-size: 16px;
		text-align: center;
	}

	.table {
		width: 100%;
		font-size: 14px;
	}

	.red {
		color: #ff0000;
	}

	.mr10 {
		margin-right: 10px;
	}
</style>
