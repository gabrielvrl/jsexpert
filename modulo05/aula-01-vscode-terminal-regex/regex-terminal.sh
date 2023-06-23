# a partir da pasta raiz
find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt
find . -name *.js -not -path '*node_modules**' | ipt

# volta para a pasta do modulo05
cp -r ../../modulo01/aula05-tdd-desafio-resolvido .

CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}

# 1s -> primeira linha
# ^-> primeira coluna
# substitui pelo $CONTENT
# quebrou a linha para adicionar um \n implicito

# muda tudo!
find . -name *.js -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}

# os de cima não funcionam, não acha nenhum arquivo, esse debaixo funciona.
CONTENT="'use strict';"
find . -name "*.js" -not -path "*node_modules*" -not -path "*coverage*" \
| xargs -I '{file}' sh -c 'if ! head -n 1 "{file}" | grep -q "^'"$CONTENT"'"; then sed -i "" -e "1s/^/'"$CONTENT"'\n/" "{file}"; fi'