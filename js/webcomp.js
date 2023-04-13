const template = document.createElement('template');
template.innerHTML = `
<style>
    .chat-header{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .chat-header > div{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
    }
    .chat-icon{
        width: 2rem;
        height: 2rem;
        padding: 0.4rem;
        border: 2px solid #000;
        border-radius: 0.3rem;
        cursor: pointer;
        position: fixed;
        bottom: 1rem;
        right: 1rem;
    }
    .chat-icon:hover{
        box-shadow: 0 2px 5px #00C781;
    }
    .virtual-agent{
        display: flex;
        min-width: 25rem;
        min-height: 30rem;
        flex-direction: column;
        justify-content: flex-end;
        transform: scale(1);
        transform-origin: bottom right;
        transition: transform 0.5s cubic-bezier(.860,.000,.070,1.000);
        z-index: 2;
        box-shadow: 0 3px 7px #00C781;
        position: absolute;
        left: calc(100vw - 26rem);
        top: calc(100vh - 31rem);
        resize: both;
        overflow: auto;
    }
    .chat-header{
        background-color: #383c47;
        color: white;
        flex: 0.6;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .hpe-chat-icon{
        padding: 0.5rem;
        width: 1.8rem;
        height: 1.7rem;
        object-fit: contain;
        border-radius: 50%;
        background-color: rgba(0, 199, 129, 1);
        margin-right: 0.5rem;
        
    }
    .chat-minimize-icon{
        width: 1rem;
        height: 0.05rem;
        object-fit: contain;
        background-color: white;
        cursor: pointer;
        transform: scale(1);
        transform-origin: bottom right;
        transition: transform 0.5s cubic-bezier(.860,.000,.070,1.000);
    }
    .chat-close-icon{
        cursor:pointer;
    }
    .actionbtn {
        display: flex;
        justify-content: flex-end;
        width: 150px;
    }
    .chat-body{
        flex: 10;
        color: white;
        padding: 1rem;
        background-color: #2b303b;
    }
    .chat-footer{
        padding-left: 1rem;
        flex: 1;
        background-color: #3e434d;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        color: white;
    }
    .chat-footer input{
        flex: 5;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        border: none;
        outline: none;
        background: none;
        color: white;
        margin-right: 0.6rem;
    }
    .chat-footer span{
        flex: 0.9;
        width: wrap-content;
        padding: 0.2rem;
        background-color: #2b303b;
    }
    .chat-footer button{
        flex: 1;
        background: none;
        background-image: url('https://files.axshare.com/gsc/7V4L4U/a5/74/55/a574551b904d4414b261c6753bb71be1/images/f14362-f14639__resize__cursor/send_u91.svg?pageId=e17232ee-3310-49e7-8e6d-9c086c76aa33');
        backgroud-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        border: none;
        width: 1.5rem;
        height: 1.5rem;
        margin-left: 1rem;
        cursor: pointer;
    }
</style>


<div class="virtual-agent">
        <div class="chat-header">
            <div>
                <img class="hpe-chat-icon">
                <h5>Care Concierge</h5>
            </div>
            <div class="actionbtn">
                <span class="chat-minimize-icon"></span>
                <span class="chat-close-icon">X</span>
            </div>
            
            
            
        </div>
        <div class="chat-body" id="chat">
        
        </div>
        <div class="chat-footer">
            <input name="message" placeholder="Message your Care Concierge..." value="" id="message" autofocus />
            <span>0-250</span>
            <button id="send"></button>
        </div>
</div>
<img class="chat-icon">
`
let pos1=0, pos2=0, pos3=0, pos4=0, moveElement=false;

class ChatModal extends HTMLElement{
    constructor(){
        super();
        
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('.chat-icon').setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/589/589708.png');
        this.shadowRoot.querySelector('.hpe-chat-icon')?.setAttribute('src', 'https://files.axshare.com/gsc/7V4L4U/a5/74/55/a574551b904d4414b261c6753bb71be1/images/f14362-f14639__resize__cursor/robot_u125.svg?pageId=e17232ee-3310-49e7-8e6d-9c086c76aa33');
        const virtualAgentDOM = this.shadowRoot.querySelector('.virtual-agent');
        virtualAgentDOM.style.transform = "scale(0)";
    }
    connectedCallback(){
        const chatIconDOM = this.shadowRoot.querySelector('.chat-icon');
        const virtualAgentDOM = this.shadowRoot.querySelector('.virtual-agent');
        this.shadowRoot.querySelector('.chat-icon').addEventListener('click', () => {
            chatIconDOM.style.transform = 'scale(0)';
            virtualAgentDOM.style.transform = 'scale(1)';
            const chatState = localStorage.getItem('chatState');
            if (chatState) {
              this.shadowRoot.getElementById('chat').innerHTML = chatState;
            }
        });
        this.shadowRoot.querySelector('.chat-minimize-icon').addEventListener('click', () => {
            virtualAgentDOM.style.transform = 'scale(0)';
            chatIconDOM.style.transform = 'scale(1)';
            localStorage.setItem('chatState', this.shadowRoot.getElementById('chat').innerHTML);
            
        });

        this.shadowRoot.querySelector('.chat-close-icon').addEventListener('click', () => {
            virtualAgentDOM.style.transform = 'scale(0)';
            chatIconDOM.style.transform = 'scale(1)';           
                this.shadowRoot.getElementById('chat').innerHTML = "";
                localStorage.removeItem('chatState');
            
        });
        this.shadowRoot.querySelector('.chat-header').addEventListener('mousedown', (e) => {
            e = e || window.event;
            e.preventDefault();
            console.log(e);
            pos3 = e.clientX;
            pos4 = e.clientY;
            moveElement = true;
        });
        this.shadowRoot.querySelector('.chat-header').addEventListener('mousemove', (e) => {
            e = e || window.event;
            e.preventDefault();
            if(moveElement){
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                virtualAgentDOM.style.top = (virtualAgentDOM.offsetTop - pos2) + "px";
                virtualAgentDOM.style.left = (virtualAgentDOM.offsetLeft - pos1) + "px";
            }
        });
        this.shadowRoot.querySelector('.chat-header').addEventListener('mouseup', (e) => {
            moveElement = false;
        });
        this.shadowRoot.querySelector('#send').addEventListener('click', () => {
            let message = this.shadowRoot.getElementById('message').value;
            this.shadowRoot.getElementById('message').value = "";
            
            let getMessage = new CustomEvent("getmessage", {
                bubbles: true,
                cancelable: true,
                detail: {
                    message: message
                }
            })
            this.dispatchEvent(getMessage);
        
            // Add the message to the chat log
            let chatLog = this.shadowRoot.getElementById('chat');
            let messageElement = document.createElement('p');
            messageElement.textContent = message;
            chatLog.appendChild(messageElement);

            window.addEventListener('beforeunload', () => {
                localStorage.setItem('chatState', this.shadowRoot.getElementById('chat').innerHTML);
              });
        });

        
    
        
      
    }

   

    static get observedAttributes() {
        return ["chat"]; 
    }

    attributeChangedCallback(name, oldVal, newVal){
        if(name === 'chat'){
            let chat = newVal.toString().replaceAll(",", "\n");
            this.shadowRoot.getElementById('chat').innerHTML = chat;
        }
    }
}

window.customElements.define('virtual-agent', ChatModal);