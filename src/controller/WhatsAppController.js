class WhatsAppController {

    constructor(){

        console.log('vai que da');

        this.elementsPrototype();
        //aplica o metodo
        this.loadElements();
        this.initEvents();
      
    }


    loadElements(){
        //irá criar um uma classe para o JS onde eu possa elemento com formato de CamelCase
            //objeto que receberá cada um das propriedades
            this.el = {};
        document.querySelectorAll('[id]').forEach(element =>{
            //transforma do class Format do metodo static
            this.el[Format.getCamelCase(element.id)] = element;
        })

    };
    elementsPrototype(){

        Element.prototype.hide = function(){

            this.style.display = 'none';
            return this.style.display;
            return this
        };

        Element.prototype.show = function(){

            this.style.display = 'block';
            return this
        };

        Element.prototype.toggle= function(){
            this.style.display = (this.style.display == 'block')? 'block': 'none' ;
            
            return this

        };
        Element.prototype.on = function(events, fn){
            events.split(' ').forEach(event =>{

                this.addEventListener(event, fn)
            })
            return this
        };

        Element.prototype.css = function(styles){
            for(let name in styles){

                this.style[name] = styles [name]
            }
            return this
        };

        Element.prototype.addClass = function(name){
            this.classList.add(name)
            return this
        };
        
        Element.prototype.removeClass = function(name){
            this.classList.remove(name)
            return this
        };
        
        Element.prototype.toggleClass = function(name){
            this.classList.toggle(name)
            return this
        };
        
        Element.prototype.hasClass = function(name){
           return this.classList.contains(name);
        
        };
        HTMLFormElement.prototype.getForm = function(){
            return new FormData(this);
        };
        HTMLFormElement.prototype.toJSON = function(){
            let json = {};
            
            this.getForm().forEach((value, key)=>{
                //json vai ter uma key e nessa key terá um valor que é o conteudo
                json[key] = value;
            });
            return json
        };


    };
    initEvents(){
        //evento on = addEventListener criado no prototype
            this.el.myPhoto.on('click', e=>{
                this.closeAllLeftPanel();
                app.el.panelEditProfile.show()
                setTimeout(()=>{
                    app.el.panelEditProfile.addClass('open')
                },300);
              
               
                
            }); // fecha o panel 
                this.el.btnClosePanelEditProfile.on('click', e=>{
                    app.el.panelEditProfile.removeClass('open')

                });
                //abre o panel do contato e fecha os outros
            this.el.btnNewContact.on('click', e=>{
                this.closeAllLeftPanel();
                app.el.panelAddContact.show()
                setTimeout(()=>{

                    app.el.panelAddContact.addClass('open')
                },300);
                
            });
                this.el.btnClosePanelAddContact.on('click', e=>{
                
                    app.el.panelAddContact.removeClass('open')

                });
           
                this.el.btnSavePanelEditProfile.on('click', e=>{

                    console.log(this.el.inputNamePanelEditProfile.innerHTML)
            });
            //quando for clicado na class da foto irá disparar o evento click e fazer input
            this.el.photoContainerEditProfile.on('click', e=>{
                this.el.inputProfilePhoto.click();

            });
            this.el.inputNamePanelEditProfile.on('keypress', e=>{
                if(e.key === 'Enter'){
                    e.preventDefault();
                    this.el.btnSavePanelEditProfile.click();
                } 

            });
                this.el.formPanelAddContact.on('submit', e=>{

                    e.preventDefault();
                  let formData = new FormData(this.el.formPanelAddContact);

                });
                this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item=>{

                    item.on('click', e=>{
                        this.el.home.hide();
                        this.el.main.css({

                            display:'flex'
                        });


                    });
                });
                
                //anexar nas conversas
                 //menu open:
                this.el.btnAttach.on('click', e=>{
                    this.el.menuAttach.toggleClass('open')
                  //  this.el.menuAttach.addClass('open');
                    e.stopPropagation();
                    document.addEventListener('click', this.closeMenuAttach.bind(this))

                });
                //menu galeria
                this.el.btnAttachPhoto.on('click', e=>{

                    this.el.inputPhoto.click();
                });
                this.el.inputPhoto.on("change", e=>{
                    [...this.el.inputPhoto.files].forEach(file=>{

                        console.log(file);
                    })
                });

                //take a photo
                this.el.btnAttachCamera.on('click', e=>{
                    this.el.panelCamera.addClass('open');
                    this.el.panelCamera.css({
                        'height':'calc(100% - 120px)'
                    });

                    this.el.panelMessagesContainer.hide();

                });
                this.el.btnClosePanelCamera.on('click', e=>{
                    this.el.panelCamera.removeClass('open');
                    this.el.panelMessagesContainer.show();
                });

                this.el.btnTakePicture.on('click', e=>{

                    console.log('take photo')
                })
                //document
                this.el.btnAttachDocument.on('click', e=>{
                    this.el.panelDocumentPreview.addClass('open');
                    this.el.panelDocumentPreview.css({
                        'height':'calc(100% - 120px)'
                    });

                    this.el.panelMessagesContainer.hide();
                });
                this.el.btnClosePanelDocumentPreview.on('click', e=>{
                    this.el.panelDocumentPreview.removeClass('open');
                    this.el.panelMessagesContainer.show();

                });
                this.el.btnSendDocument.on('click', e=>{
                    this.el.panelDocumentPreview.removeClass('open');
                    this.el.panelMessagesContainer.show();

                    console.log('enviou');
                })

                //contact
                this.el.btnAttachContact.on('click', e=>{
                    this.el.modalContacts.show();

                });
                this.el.btnCloseModalContacts.on('click', e=>{
                    
                    this.el.modalContacts.hide();
                });

                //microfone
                this.el.btnSendMicrophone.on('click',e=>{
                    this.el.recordMicrophone.show();
                    this.el.inputText.hide();
                    this.el.btnSendMicrophone.hide();
                    this.startRecMic();
                });
                this.el.btnCancelMicrophone.on('click', e=>{
                   this.closeRecMic();
                   this.el.inputText.show();
                });
                this.el.btnFinishMicrophone.on('click', e=>{
                   
                this.closeRecMic();
                this.el.inputText.show();

                });

               //text
               this.el.inputText.on('keypress', e=>{
                if(e.key === 'Enter' && !e.ctrlKey){

                    e.preventDefault();
                    this.el.btnSend.click();
                };

               });
                this.el.inputText.on('keyup', e=>{
                    if(this.el.inputText.innerHTML.length){
                        this.el.btnSendMicrophone.hide();
                        this.el.btnSend.show();
                        this.el.inputPlaceholder.hide();
                    } else{      
                        this.el.inputPlaceholder.show();
                        this.el.btnSendMicrophone.show();
                        this.el.btnSend.hide();
                    };

                });
                this.el.btnSend.on('click',e=>{
                  console.log(this.el.inputText.innerHTML)
                
                });

                this.el.btnEmojis.on('click', e=>{

                    this.el.panelEmojis.toggleClass('open');
                });
                this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji=>{
                    emoji.on('click',e=>{

                    console.log(emoji.dataset.unicode)
                    })
                })
    };
    startRecMic(){

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(()=>{
           this.el.recordMicrophoneTimer.innerHTML = Format.time(Date.now() - start)

        },100);

    }
    closeRecMic(){

        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicrophoneInterval);

    }
    closeAllLeftPanel(){

        app.el.panelEditProfile.hide();
        app.el.panelAddContact.hide();

    };
    closeMenuAttach(e){
        document.removeEventListener('click', this.closeMenuAttach)
        this.el.menuAttach.removeClass('open');

    };
}