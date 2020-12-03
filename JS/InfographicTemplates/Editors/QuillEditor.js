class QuillEditor
{
    CreateEditorUI()
    {
        var container = document.createElement('div');
        container.id = 'editor-container';
        return container;
    }

    CreateQuillObject()
    {
        let Font = Quill.import('formats/font');
        var fontList = ['900-museo', '100-canada', '200-canada', 
            '400-canada', '500-canada', '600-canada', '700-canada', '900-canada'];
        Font.whitelist = fontList;
        Quill.register(Font, true);

        var Size = Quill.import('attributors/style/size');
        var sizeList = ['10px', '11px', '12px', '13px', '14px', '15px', '16px', 
            '17px', '18px', '20px'];
        Size.whitelist = sizeList;
        Quill.register(Size, true);

        var quill = new Quill('#editor-container', {
            modules: {
                toolbar: [
                  [{'font': fontList}],
                  [{'size': sizeList}],
                  ['bold', 'italic', 'underline'],
                  ['image', 'code-block'],
                ],
              },
              placeholder: 'Compose an epic...',
              theme: 'snow', // or 'bubble'
        });
    }
}