var infogObj;
function UpdatePage(infogNum)
{
    if (infogObj !== undefined) infogObj.Remove();

    console.log(document.getElementById('Placeholder'));
    if (document.getElementById('Placeholder') !== null) RemovePlaceholder();

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
    CreatePlaceholder();
}

function CreatePlaceholder()
{
    var editor = document.getElementById('editor');
    var message = document.createElement('p');
    message.id = 'Placeholder';
    message.innerHTML = '<-- Double click on a chart or text element to begin editing!';
    editor.appendChild(message);
}

function RemovePlaceholder()
{
    document.getElementById('Placeholder').remove();
}