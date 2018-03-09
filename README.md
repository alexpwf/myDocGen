# myDocGen

Just another documentation generator from a markdown file, for my projects.

## Install

```bash
git clone https://github.com/alexpwf/myDocGen.git
cd myDocGen
npm i
````

You can also create a link in your bin folder.
```bash
ln -s `pwd`/docGen.js /usr/bin/bin/docgen
```

## Run
Just give the path of your documentation write in Markdown and enjoy.
```bash
./docGen <input_path.md> [output_path.pdf]
```

### Specificity of Markdown
All rules of [github markdown convention](https://guides.github.com/features/mastering-markdown/) is respected **EXCEPT** one think.
###### Horizontal Rules
- `***` is changed to *end of page* for pdf format. 
