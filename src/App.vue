<template>
	<div id="app">
		<a-input
			placeholder="请输入任务"
			class="my_ipt"
			:value="inputValue"
			@change="handleInputChange"
		/>
		<a-button type="primary" @click="addItemToList">添加事项</a-button>

		<a-list bordered :dataSource="infoList" class="dt_list">
			<a-list-item slot="renderItem" slot-scope="item">
				<!-- 复选框 -->
				<a-checkbox :checked="item.done" @change="cbStatusChanged(item.id)">{{
					item.info
				}}</a-checkbox>
				<!-- 删除链接 -->
				<a slot="actions" @click="removeItemById(item.id)">删除</a>
			</a-list-item>

			<!-- footer区域 -->
			<div slot="footer" class="footer">
				<!-- 未完成的任务个数 -->
				<span>{{ unDoneLength }}条剩余</span>
				<!-- 操作按钮 -->
				<a-button-group>
					<a-button
						:type="btnKey === 'all' ? 'primary' : ''"
						@click="changeList('all')"
						>全部</a-button
					>
					<a-button
						:type="btnKey === 'unDone' ? 'primary' : ''"
						@click="changeList('unDone')"
						>未完成</a-button
					>
					<a-button
						:type="btnKey === 'done' ? 'primary' : ''"
						@click="changeList('done')"
						>已完成</a-button
					>
				</a-button-group>
				<!-- 把已经完成的任务清空 -->
				<a @click="clean">清除已完成</a>
			</div>
		</a-list>
	</div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
	name: 'app',
	data() {
		return {}
	},
	methods: {
		...mapActions(['getList', '']),
		...mapMutations([
			'setInputValue',
			'addItem',
			'removeItem',
			'changeStatus',
			'cleanDone',
			'changeBtnKey',
		]),

		// 监听文本框内容变化
		handleInputChange(e) {
			// console.log(e.target.value)
			this.setInputValue(e.target.value)
		},

		// 向列表中新增item项
		addItemToList() {
			if (this.inputValue.trim().length <= 0) {
				return this.$message.warning('文本框内容不能为空!')
			}

			// 若文本框有内容
			this.addItem()
		},

		removeItemById(id) {
			// console.log(id)
			this.removeItem(id)
		},

		// 传入状态改变的复选框对应id
		cbStatusChanged(id) {
			this.changeStatus(id)
		},

		// 清楚已完成的选项
		clean() {
			this.cleanDone()
		},

		// 点击 全部/未完成/已完成 标签时改变type
		changeList(key) {
			this.changeBtnKey(key)
		},
	},
	created() {
		this.getList()
	},
	computed: {
		...mapState(['list', 'inputValue', 'btnKey']),
		...mapGetters(['unDoneLength', 'infoList']),
	},
}
</script>

<style scoped>
#app {
	padding: 10px;
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.my_ipt {
	width: 500px;
	margin-right: 10px;
}

.dt_list {
	width: 500px;
	margin-top: 10px;
}

.footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
