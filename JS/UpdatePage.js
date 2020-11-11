var infogObj;
function UpdatePage(infogNum)
{
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
    infogObj.CreateInfographic();
    infogObj.Draw();
}