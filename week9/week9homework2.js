function Stack(){
	var arr = []
	this.push = function(n){
		arr.push(n)
	}
	this.pop = function(){
		var arr_ln = arr.length
		var arr_res = arr[arr_ln-1]
		arr = arr.slice(0, arr_ln-1)
		return arr_res
	}
}

function Queue(){
	var arr_q = []
	this.push = function(n){
		arr_q.push(n)
	}
	this.pop = function(){
		var arr_q_res = arr_q[0]
		var arr_q_ln = arr_q.length
		arr_q = arr_q.slice(1, arr_q_ln)
		return arr_q_res
	}
}


var stack = new Stack()
stack.push(10)
stack.push(5)
console.log(stack.pop()) // 5
console.log(stack.pop()) // 10

var queue = new Queue()
queue.push(1)
queue.push(2)
console.log(queue.pop()) // 1
console.log(queue.pop()) // 2