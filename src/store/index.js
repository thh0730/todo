import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// 所有列表数据
		list: [],
		// 文本框内容
		inputValue: 'aaa',
		// 模拟下一项id
		nextId: 5,
		// 按钮key
		btnKey: 'all',
	},
	mutations: {
		initList(state, list) {
			state.list = list
		},
		/* 同步文本框内容 */
		setInputValue(state, val) {
			state.inputValue = val
		},
		/* 添加到列表项 */
		addItem(state) {
			const obj = {
				id: state.nextId,
				info: state.inputValue.trim(),
				done: false,
			}
			// 添加到列表项中
			state.list.push(obj)
			// nextId自增1
			state.nextId++
			// 清空文本框
			state.inputValue = ''
		},
		/* 根据id删除对应的任务项 */
		removeItem(state, id) {
			// 根据索引查找到对应任务项
			const index = state.list.findIndex(x => x.id === id)
			// findIndex 如果没有符合条件的元素返回 -1
			if (index !== -1) {
				state.list.splice(index, 1)
			}
		},

		/* 根据id改变对应复选框的状态(true/false) */
		changeStatus(state, id) {
			// 使用map函数遍历数组, 之后将对应id的复选框状态取反
			state.list.map(x => {
				if (x.id === id) {
					return (x.done = !x.done)
				}
			})
		},

		/* 清除已完成的的任务项 */
		cleanDone(state) {
			state.list = state.list.filter(x => x.done === false)
		},

		/* 根据选择的标签改变按钮的key */
		changeBtnKey(state, key) {
			state.btnKey = key
		},
	},
	actions: {
		getList(context) {
			axios.get('list.json').then(({ data }) => {
				console.log(data)
				context.commit('initList', data)
			})
		},
	},
	getters: {
		/* 统计未完成的任务条数 */
		unDoneLength(state) {
			// 通过filter函数过滤出对应条件的选项
			return state.list.filter(x => x.done === false).length
		},

		/* 包装list 按标签状态返回数据 */
		infoList(state) {
			if (state.btnKey === 'unDone') {
				return state.list.filter(x => !x.done)
			}
			if (state.btnKey === 'done') {
				return state.list.filter(x => x.done)
			}
			return state.list
		},
	},
	modules: {},
})
