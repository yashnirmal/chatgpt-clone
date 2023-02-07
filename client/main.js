const prompt = document.querySelector('#prompt')
const submitBtn = document.querySelector('#submit-btn')
const answer = document.querySelector('#answer')

submitBtn.addEventListener('click',()=>{
  answer.value = "getting the code from server, wait few seconds"
  fetch('http://localhost:5050/code',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({prompt:prompt.value})
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.status=='ok'){
      answer.value=data.data
    }else{
      answer.value="Some Error Occured"
    }
  })
  .catch(err=>{
    answer.value="Some Error Occured"
  })
  
})
