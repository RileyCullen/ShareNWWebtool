var infogObj;
function UpdatePage(infogNum)
{
    document.fonts.ready.then(() => {
        if (infogObj !== undefined) infogObj.Remove();
        if (document.getElementById('Placeholder') != null) RemovePlaceholder();

        switch(infogNum) {
            case 0: 
                infogObj = new HIVTemplateOne();
                break;
            case 1: 
                infogObj = new ObesityTemplateOne();
                break;
            case 2: 
                infogObj = new ViolenceTemplateOne();
                break;
            case 3:
                infogObj = new DiabetesTemplateOne();
                break;
        }
        infogObj.CreateInfographic();
        infogObj.Draw();
        CreatePlaceholder();
    });
}

function CreatePlaceholder()
{
    var editor = document.getElementById('editor');

    var container = document.createElement('div');
    container.id = 'Placeholder';
    editor.appendChild(container);

    var arrow = document.createElement('i');
    arrow.className = 'fas fa-arrow-left';
    arrow.style.height = 20 + 'px';
    arrow.style.float = 'left';
    arrow.style.paddingTop = 12 + 'px';
    container.appendChild(arrow);

    var message = document.createElement('p');
    message.innerHTML = 'Double click on a chart or text element to begin editing!';
    message.style.backgroundColor = '#ccc';
    message.style.padding = 10 + 'px';
    message.style.marginLeft = 30 + 'px';
    message.style.borderLeftStyle = 'solid';
    message.style.width = 400 + 'px';
    message.style.height = 20 + 'px';
    container.appendChild(message);
}

function RemovePlaceholder()
{
    var parent = document.getElementById('Placeholder');
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    parent.remove();
}