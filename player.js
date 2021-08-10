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
     console.log("CSS loaded.")

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
                // parse the data to a valid structure of json.
                let content = (JSON.stringify(step.action.contents).split(":")[1]).slice(0,-4).slice(1)
                let selector = step.action.selector
                let placement = step.action.placement
                // Generate html template
                const html = getTooltipStr(content,step.id, step.action.classes,placement)
                // Create new element with the content that coming from html variable and append it to body.
                const divEl = document.createElement('div')
                divEl.innerHTML = html
                const bodyEl = document.body
                bodyEl.append(divEl)
                // Find the welcome content and turn him to block instead none
                if(content.includes('Welcome')){
                    $(`#x_${step.id}`).css({
                        position: "absolute",
                        display: "block",
                        bottom: '',
                        right: 300,
                        top: 70
                    })
                }
                // Replace all double-quotes to single quotes. for selector.
                selector = selector.replaceAll(/"/g,"'")
                // Add event listener for selectors that coming from data.
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