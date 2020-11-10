var infogObj;
function UpdatePage(infogNum)
{
    console.log(infogObj)
    if (infogObj !== undefined) infogObj.Remove();
    switch(infogNum) {
        case 0: 
            infogObj = new HIVTemplateOne();
            break;
        case 1: 
            infogObj = new ObesityTemplateOne();
            break;
        case 2: 
            infogObj = new ViolenceTemplateOne();
    }
    console.log(infogObj);
    infogObj.CreateInfographic();
    infogObj.Draw();
}