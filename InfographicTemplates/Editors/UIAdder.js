class UIAdder 
{
    constructor()
    {
        this._main = document.getElementById('editor');
        this._group = document.createElement('div');
    }

    CreateWaffleEditor(chart, group, main, tr)
    {
        this._AddGroupToMain();
        this._group.appendChild(new WaffleEditor(chart, group, main, tr)
            .CreateWaffleEditor());
    }

    RemoveCurrentEditor()
    {
        this._RemoveGroupFromMain();
    }

    _AddGroupToMain()
    {
        this._main.appendChild(this._group);
    }

    _RemoveGroupFromMain()
    {
        this._main.removeChild(this._group);
        this._RemoveAllChildNodes(this._group);
    }

    _RemoveAllChildNodes(node)
    {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
    
}