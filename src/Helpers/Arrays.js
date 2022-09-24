export function deepCopy(arr) {
    try {
        return JSON.parse(JSON.stringify(arr));
    } catch (error) {
        return arr;
    }
}

export function arrOfObjToFormData(arr, prefix){
    const formData={};
    arr.forEach((item, i) => {
        Object.keys(item).forEach((k,i2)=>{
            formData[`${prefix}[${i}][${k}]`]= item[k];
        })
    });
    console.log(formData);
    return formData;
}