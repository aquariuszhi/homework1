document.addEventListener('DOMContentLoaded', function(){
				
	//子留言區輸入區塊的收合
	var message_section = document.querySelectorAll('.message_collapse')
	for (let i = 0 ; i < message_section.length ; i++){
		message_section[i].addEventListener('click', e =>{
			var div = message_section[i]
			var expand = div.classList.toggle('message_expand')
			var div_show = document.querySelectorAll('.comment_insert_hide')[i]
			var show = div_show.classList.toggle('comment_insert_show')
						
			if(expand && show){
				e.target.innerText = '回應▼' ;
			} else {
				e.target.innerText = '回應▲' ;
			}
		})
	}
})

	//傳資料到後端（ajax）
	function ajax_main(){
		nickname = document.querySelector('#nickname_main')
		comment = document.querySelector('#writecomment_main')
		if(checkForm()){
			var request = new XMLHttpRequest();
			
			request.onreadystatechange = function() {
			  if (this.readyState == 4 && this.status < 400) {
				var resp = request.responseText;
				creatMainMessageDiv()
			  } else {
				alert ('error')
			  }
			};
			request.onerror = function() {
			  alert ('error')
			};	
			
			request.open('POST', '/PHP/week5homework2_post_main.php', true);
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');


			request.send("&nickname="+nickname+"&comment="+comment);
		}
	}
	
	//判斷主留言板 1.暱稱是否過長 2.是否暱稱和評論都有輸入文字
	function checkForm(){				
		if(nickname.length > 10){
			alert ('nickname too long')
			return false
		} else if (nickname.length == 0 || comment.length == 0){
			alert ('Please insert nickname or comment')
			return false
		} else {
			return true
		}
	}
	
	//將主留言顯示出來
	function creatMainMessageDiv(){
		document.querySelector('#nickname_main').value = ''
		document.querySelector('#writecomment_main').value = ''
		//新增主留言區塊
		var messageMainDiv = document.createElement('div')
		messageMainDiv.className = 'main'
		//新增主留言的作者和留言時間並加入主留言區塊
		var informationDiv = document.createElement('div')
		informationDiv.className = 'information name_time main_comment_done'
		var nicknameMainP = document.createElement('p')
		nicknameMainP.innerText = '暱稱'
		var timeMainP = document.createElement('p')
		timeMainP.innerText = '時間'
		informationDiv.appendChild(nicknameMainP)
		informationDiv.appendChild(timeMainP)
		messageMainDiv.appendChild(informationDiv)
		//新增主留言文字並加入主留言區塊
		var commentMainDiv = document.createElement('div')
		commentMainDiv.className = 'information main_comment_done'
		var commentMainP = document.createElement('p')
		commentMainP.innerText = '留言'
		commentMainDiv.appendChild(commentMainP)
		messageMainDiv.appendChild(commentMainDiv)
		
		//新增子留言區塊並加入主留言區塊
		var messageChildDiv = document.createElement('div')
		messageChildDiv.className = 'child_comment'
		messageMainDiv.appendChild(messageChildDiv)
		//新增子留言的作者和留言時間並加入子留言區塊
		var informationChildDiv = document.createElement('div')
		informationChildDiv.className = 'information name_time'
		var nicknameChildP = document.createElement('p')
		nicknameChildP.innerText = '暱稱'
		var timeChildP = document.createElement('p')
		timeChildP.innerText = '時間'
		informationChildDiv.appendChild(nicknameChildP)
		informationChildDiv.appendChild(timeChildP)
		messageChildDiv.appendChild(informationChildDiv)
		//新增子留言文字並加入子留言區塊
		var commentChildDiv = document.createElement('div')
		commentChildDiv.className = 'information'
		var commentChildP = document.createElement('p')
		commentChildP.innerText = '留言'
		commentChildDiv.appendChild(commentMainP)
		messageChildDiv.appendChild(commentMainDiv)
		
		//新增子留言輸入區並加入子留言區塊
		var messageInsertForm = document.createElement('form')
		messageInsertForm.className = 'input_child_comment'
		messageInsertForm.setAttribute('method', 'POST')
		messageChildDiv.appendChild(messageInsertForm)
		//新增子留言回應鈕並加入子留言區塊
		var commentCollapseSpan = document.createElement('span')
		commentCollapseSpan.className = 'message_collapse'
		commentCollapseSpan.innerText = '回應▼'
		messageInsertForm.appendChild(commentCollapseSpan)
		//新增子留言輸入收合區塊並加入子留言區塊
		var childInsertSection = document.createElement('section')
		childInsertSection.className = 'comment_insert_hide comment_insert_show'
		messageInsertForm.appendChild(childInsertSection)
		//新增子留言暱稱輸入區塊並加入子留言輸入收合區塊
		var nicknameChildInsertDiv = document.createElement('div')
		var nicknameChildInsertInput = document.createElement('input')
		nicknameChildInsertInput.setAttribute('type', 'text')
		nicknameChildInsertInput.setAttribute('name', 'nickname_child')
		nicknameChildInsertInput.setAttribute('placeholder', '在此輸入您的暱稱')
		childInsertSection.appendChild(nicknameChildInsertDiv)
		nicknameChildInsertDiv.appendChild(nicknameChildInsertInput)
		//新增子留言文字輸入區塊並加入子留言輸入收合區塊
		var commentChildInsertDiv = document.createElement('div')
		var commentChildInsertTextarea = document.createElement('textarea')
		commentChildInsertTextarea.setAttribute('name', 'comment_child')
		commentChildInsertTextarea.setAttribute('wrap', 'physical')
		commentChildInsertTextarea.setAttribute('placeholder', '在此輸入您的評論')
		commentChildInsertTextarea.className = 'writecomment'
		var mainIdInput = document.createElement('input')
		mainIdInput.setAttribute('type', 'hidden')
		mainIdInput.setAttribute('name', 'id_main')
		mainIdInput.setAttribute('value', 'id_main')
		childInsertSection.appendChild(commentChildInsertDiv)
		commentChildInsertDiv.appendChild(commentChildInsertTextarea)
		commentChildInsertDiv.appendChild(mainIdInput)
		//新增子留言提交按鈕並加入子留言輸入收合區塊
		var commentChildSubmit = document.createElement('input')
		commentChildSubmit.setAttribute('type', 'submit')
		commentChildSubmit.setAttribute('name', 'submit')
		commentChildSubmit.setAttribute('value', '送出')
		commentChildSubmit.setAttribute('onclick', 'ajax_child()')
		commentChildSubmit.className = 'submit'
		childInsertSection.appendChild(commentChildSubmit)
	}	
