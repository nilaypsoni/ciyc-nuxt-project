const requiredCheck=(form,keys=[])=>{
    let value = false
    let arr=[]
    keys.map(itm=>{
        if(requiredMatch(form,itm)){
            value=true
            arr.push({...itm,message:`${itm.name} is required`})
        }
    })
    return {err:value,list:arr}
}

const minlength=(form,keys=[])=>{
    let value = false
    let arr=[]
    keys.map(itm=>{
        if(minMatch(form,itm)){
            value=true
            arr.push({...itm,message:`${itm.name} Minimum length is ${itm.minlength}`})
        }
    })
    return {err:value,list:arr}
}

const minMatch=(form,itm)=>{
    let value
    if(form[itm.key]&&form[itm.key].length<itm.minlength&&itm.minlength){
        value=true
    }
    return value
}

const requiredMatch=(form,itm)=>{
    let value
    if(!form[itm.key]&&itm.required){
        value=true
    }
    return value
}

const error=(form,keys)=>{
    let value = false
    let arr=[]
    keys.map(itm=>{
        if(requiredMatch(form,itm)){
            value=true
            arr.push({...itm,message:`${itm.name} is required`})
        }
        else if(minMatch(form,itm)){
            value=true
            arr.push({...itm,message:`${itm.name} Minimum length is ${itm.minlength}`})
        }
    })

    return {err:value,list:arr}
}


const formModel={requiredCheck,minlength,error}
export default formModel