export function initEmailForm(){
const modalWindow = document.querySelector(".contact-modal-background")
const submitBtn = document.querySelector(".contact-modal-btn");

     if (!modalWindow || !submitBtn){
           console.warn("form modal not found");
           return;
        } 


      function getValueId(id){
        return document.getElementById(id)?.value ?? "";
      }
      
      function buildParams(){
        return{
        name: getValueId("sender-name").trim(), 
        email: getValueId("email").trim(), 
        number: getValueId("phone-number").trim(), 
        message:getValueId("message").trim(),
        }
        }
      
         
 async function sendMail(){
  const params = buildParams();

  if(!params.email || !params.message){
    alert("Przed wysłaniem wiadomości, uzupełnij wszystkie wymagane pola.");
    return;
  }
 submitBtn.disabled = true;

  try{
    await emailjs.send("service_6i84dw9", "template_82renkc", params);
    alert("Email został wysłany.");
    
  }
  catch(err){
    console.log("błąd wysyłki email", err);
    alert("Wysyłanie wiadomości zakończone niepowodzeniem, spróbuj później.")
  } finally{
     submitBtn.disabled = false;
  }    
  }
  submitBtn.addEventListener("click", ()=>{
    sendMail();
    })
  }