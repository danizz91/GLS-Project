//Inject Jquery

main();

 async function main() {

     await loadJquery();
     loadCss();
     createSteps();
     console.log('player.js has loaded!')
 }


const getTooltipStr = (content,id,classes,placement)=>{
    let vertical = "top"
    if(placement === 'bottom'){
        vertical = "bottom"
        placement = "left"
    }

    let html =`<div id="x_${id}" style="display: none; color: rgb(244, 237, 237); position: absolute;${placement}:${parseInt(id)*10}%;${vertical}:10%;border-radius:30px; padding:10px; background: black; border-block-color: inherit;">
   	<div class="tooltip in">
		<div class="tooltip-arrow"></div>
		<div class="tooltip-arrow second-arrow"></div>
		<div class="popover-inner">
     			${content}
    		</div>
  	</div>
  </div>`
    return html
}

// To make the load sync



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 async function loadJquery(){

    let jq = document.createElement('script');
    jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    // waiting for jQuery to load.
    while(typeof(window.jQuery) === undefined ||  typeof(window.$)===undefined || typeof($.ajax)!=="function"){
        await sleep(300)
    }

    console.log("jQuery loaded.")

 }


 function  loadCss(){
     //inject css
     let linkElement = document.createElement('link');
     /* add attributes */
     linkElement.setAttribute('rel', 'stylesheet');
     linkElement.setAttribute('href', 'https://guidedlearning.oracle.com/player/latest/static/css/stTip.css');
     /* attach to the document head */
     document.getElementsByTagName('head')[0].appendChild(linkElement);
     $("head").append(linkElement)
 }


function createSteps(){
    //inject css
    let linkElement = document.createElement('link');
    /* add attributes */
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', 'https://guidedlearning.oracle.com/player/latest/static/css/stTip.css');
    /* attach to the document head */
    document.getElementsByTagName('head')[0].appendChild(linkElement);
    $("head").append(linkElement)



///ajax get all GUID
    const url = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867"

    $.ajax({
        url:url,
        dataType:'jsonp',
        success:(data)=>{

            const jsonData = data.data.structure.steps
            jsonData.forEach((step)=>{
                if(JSON.stringify(step.action.contents) === undefined){
                    return
                }

                let content = (JSON.stringify(step.action.contents).split(":")[1]).slice(0,-4).slice(1)
                let selector = step.action.selector
                let placement = step.action.placement
                const html = getTooltipStr(content,step.id, step.action.classes,placement)
                const divEl = document.createElement('div')
                divEl.innerHTML = html
                selector = selector.replaceAll(/"/g,"'")
                const formEl = document.body
                formEl.append(divEl)
                if(content.includes('Welcome')){
                    $(`#x_${step.id}`).css({
                        position: "absolute",
                        display: "block",
                        bottom: '',
                        right: 300,
                        top: 70
                    })
                }
                $(selector).mouseenter(()=>{
                    $(`#x_${step.id}`).show();
                })
                $(selector).mouseleave(()=>{
                    $(`#x_${step.id}`).hide();
                })
            })
        }
    })
}