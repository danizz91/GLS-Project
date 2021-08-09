//Inject Jquery
let jq = document.createElement('script');
jq.src = "https://code.jquery.com/jquery-3.5.0.js";
document.getElementsByTagName('head')[0].appendChild(jq);

const getTooltipStr = (content,id,classes)=>{

    let html =`<div id="x_${id}" style="display:block; color:white"  class="sttip ${classes}">
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


setTimeout(function() {

//inject css
    var linkElement = document.createElement('link');
    /* add attributes */
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', 'https://guidedlearning.oracle.com/player/latest/static/css/stTip.css');
    /* attach to the document head */
    document.getElementsByTagName('head')[0].appendChild(linkElement);
    $("head").append(linkElement).append(function(){



///ajax get all GUID
        const url = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867"
        $(document).ready(()=>{
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
                        const html = getTooltipStr(content,step.id, step.action.classes)
                        const divEl = document.createElement('div')
                        divEl.innerHTML = html
                        selector = selector.replaceAll(/"/g,"'")
                        const formEl = document.body
                        formEl.append(divEl)
                        console.log(`#x_${step.id}`)
                        if(placement === 'right'){
                            $(`#x_${step.id}`).css({
                                position: "absolute",
                                right: 70,
                                top: 20
                            })
                        }else if(placement === 'bottom'){
                            $(`#x_${step.id}`).css({
                                position: "absolute",
                                bottom: 50
                            })
                        }
                        $(selector).mouseenter(()=>{
                            console.log('show')
                            $(`#x_${step.id}`).show();
                        })
                        $(selector).mouseleave(()=>{
                            console.log('hide')
                            $(`#x_${step.id}`).hide();
                        })
                    })

                }
            })
        })
    })
},2000);
